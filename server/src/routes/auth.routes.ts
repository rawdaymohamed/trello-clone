import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validateRequest.js";
import { loginSchema, signupSchema } from "../validation/auth.validation.js";

const router = Router();

// POST /api/auth/signup
router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
