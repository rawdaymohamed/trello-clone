import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  "https://its-trello-clone.vercel.app", // Production URL
  "http://localhost:5173", // For local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow necessary methods
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Custom headers
  }),
);

// Ensure preflight requests are handled
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
