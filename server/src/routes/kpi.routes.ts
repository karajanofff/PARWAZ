import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import * as controller from "../controllers/kpi.controller.js";
import { kpiSchema } from "./validators.js";

const router = Router();

router.get("/", controller.list);
router.get("/station/:stationId", controller.byStation);
router.post("/", validate(kpiSchema), controller.create);

export default router;

