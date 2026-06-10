import { Router } from "express";
import { UserRole } from "@prisma/client";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import * as controller from "../controllers/station.controller.js";
import { stationSchema } from "./validators.js";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", requireRole(UserRole.ADMIN), validate(stationSchema), controller.create);
router.put("/:id", requireRole(UserRole.ADMIN), validate(stationSchema.partial()), controller.update);
router.delete("/:id", requireRole(UserRole.ADMIN), controller.remove);

export default router;

