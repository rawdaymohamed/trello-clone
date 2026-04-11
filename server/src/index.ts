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

// To this (more reliable for local):
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// THE KEY: Export the app for Vercel
export default app;
