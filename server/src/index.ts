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
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add this
  }),
);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running securely...");
});

// CRITICAL: Only listen if NOT on Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// THE KEY: Vercel needs this export
export default app;
