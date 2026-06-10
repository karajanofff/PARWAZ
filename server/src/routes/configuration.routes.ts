import { Router } from "express";
import { UserRole } from "@prisma/client";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import * as controller from "../controllers/configuration.controller.js";
import { configurationSchema } from "./validators.js";

const router = Router();

router.get("/", controller.list);
router.get("/:stationId", controller.get);
router.put("/:stationId", requireRole(UserRole.ADMIN), validate(configurationSchema.partial()), controller.update);

export default router;

