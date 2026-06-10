import { Router } from "express";
import { UserRole } from "@prisma/client";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import * as controller from "../controllers/user.controller.js";
import { userCreateSchema, userUpdateSchema } from "./validators.js";

const router = Router();

router.use(requireRole(UserRole.ADMIN));
router.get("/", controller.list);
router.post("/", validate(userCreateSchema), controller.create);
router.put("/:id", validate(userUpdateSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;

