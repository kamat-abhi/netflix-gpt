import Otp from "../models/Otp.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

// Helper: Generate Otp
const genearteOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//Register
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists!" });

    const user = await User.create({ name: name, email: email, password });

    // Delete previous OTPs if any
    await Otp.deleteMany({ userId: user._id, type: "verify" });

    const otp = genearteOtp();
    const expireAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await Otp.create({ userId: user._id, otp, type: "verify", expireAt });
    await sendEmail(user.email, "Your OTP Code for Account Verification", otp, user.name);

    res.status(201).json({ message: "User created. OTP sent to email." });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};


// Verify Email
export const verifyEmail = async (req, res) => {
    const {email, otp} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message: "User not found"});

    const validOtp = await Otp.findOne({userId: user._id, otp, type: "verify",});
    if(!validOtp || validOtp.expireAt < Date.now() ) return res.status(400).json({message: "Invalid or expired Otp"});

    user.isAccountVerifed = true;
    await user.save();
    await Otp.deleteMany({userId: user._id, type: "verify"});

    res.json({message: "Email verified successfully"});
};

//Login
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    if (!user.isAccountVerifed)  // fixed typo: isAccountVerified
      return res.status(401).json({ message: "Email not verified" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

