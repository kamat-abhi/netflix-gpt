import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB connestion error: ", err);
    });
    await mongoose.connect(`${process.env.MONGODB_URI}netflix-auth`);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
