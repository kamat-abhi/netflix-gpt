import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

app.get("/", (req, res) => {
    res.send("Api workingg");
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})