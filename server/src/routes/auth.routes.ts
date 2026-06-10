import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import * as controller from "../controllers/auth.controller.js";
import { loginSchema } from "./validators.js";

const router = Router();

router.post("/login", validate(loginSchema), controller.login);
router.get("/me", authenticate, controller.me);

export default router;

