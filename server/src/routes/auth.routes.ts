import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validateRequest.js";
import { signupSchema } from "../validation/auth.validation.js";

const router = Router();

// POST /api/auth/signup
router.post("/signup", validate(signupSchema), signup);

export default router;
