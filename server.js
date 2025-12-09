import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Base URL
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api/v1/auth', authRoutes)
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

