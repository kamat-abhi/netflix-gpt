import nodemailer from "nodemailer";

const sendEmail = async (to, subject, otp, userName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"The Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: `Hello ${userName},

Your One-Time Password (OTP) for account verification is: ${otp}

Please use this code within the next 10 minutes.
If you did not request this verification, please ignore this email.

Thank you,
The Team`,

      html: `
      <div style="max-width: 400px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; font-family: Arial, sans-serif; background: #f9f9f9;">
        <h2 style="text-align: center; color: #4CAF50;">Email Verification</h2>
        <p>Hello <b>${userName}</b>,</p>
        <p>Your One-Time Password (OTP) is:</p>
        <div style="text-align: center; background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #4CAF50; font-size: 22px; letter-spacing: 3px; color: #333;">
          <b>${otp}</b>
        </div>
        <p style="margin-top: 20px;">This code will expire in <b>10 minutes</b>.</p>
        <p>If you did not request this verification, please ignore this email.</p>
        <p style="text-align: center; color: #555; font-size: 14px;">— The Team</p>
      </div>
      `,
    };

    // 3️⃣ Send Email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully: ", info.response);
  } catch (error) {
    console.error("❌ Error sending email: ", error);
  }
};

export default sendEmail;
