import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { SignupInput } from "../validation/auth.validation";

export const signup = async (
  req: Request<{}, {}, SignupInput>,
  res: Response,
) => {
  try {
    const { name, username, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already exists" });
    }

    const user = await User.create({ name, username, email, password });

    // --- NEW: Generate JWT ---
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn,
    } as jwt.SignOptions);

    // --- NEW: Send via HttpOnly Cookie ---
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
