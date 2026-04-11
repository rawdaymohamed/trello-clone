import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import type { SignupInput, LoginInput } from "../validation/auth.validation.js";

const signToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: expiresIn || "7d",
  } as jwt.SignOptions);
};

const sendAuthCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

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

    const token = signToken(user._id.toString());
    sendAuthCookie(res, token);

    return res.status(201).json({
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
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }

    const token = signToken(user._id.toString());
    sendAuthCookie(res, token);

    return res.status(200).json({
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
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};
