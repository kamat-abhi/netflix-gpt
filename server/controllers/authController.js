import Otp from "../models/Otp";
import User from "../models/user";
import sendEmail from "../utils/sendEmail";

// Helper: Generate Otp
const genearteOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//Register
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status.json({ message: " Email already Exists! " });

    const user = await User.create({ name, email, password });

    const otp = genearteOtp();
    const expireAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.create({ userId: user._id, otp, type: "verify", expireAt });
    await sendEmail(user.email, "Your OTP Code for Account Verification", otp, user.name);

    res.status(201).json({ message: "User created. OTP sent to email." });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};


