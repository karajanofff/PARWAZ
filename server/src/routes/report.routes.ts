import { Router } from "express";
import * as controller from "../controllers/report.controller.js";

const router = Router();

router.get("/summary", controller.summary);
router.get("/export/csv", controller.exportCsv);

export default router;

