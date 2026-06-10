import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import * as controller from "../controllers/alarm.controller.js";
import { alarmSchema } from "./validators.js";

const router = Router();

router.get("/", controller.list);
router.post("/", validate(alarmSchema), controller.create);
router.put("/:id/resolve", controller.resolve);

export default router;

