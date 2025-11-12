import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["verify", "reset"],
            required: true
        },
        expireAt: {
            type: Date,
            required: true
        }, 
    },
    { timestamps: true}
);

const Otp = mongoose.models.Otp || mongoose.model("Otp", otpSchema);
export default Otp;