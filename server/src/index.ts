import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow your Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow these headers
    credentials: true, // Essential for HttpOnly Cookies!
  }),
);
app.options("*", cors());
app.use(express.json()); // Essential to prevent the "undefined req.body" bug
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running securely...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
