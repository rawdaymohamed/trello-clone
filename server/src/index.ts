import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Essential to prevent the "undefined req.body" bug
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow your Vite frontend
    credentials: true, // Essential for HttpOnly Cookies!
  }),
);
app.options(/.*/, cors());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running securely...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
