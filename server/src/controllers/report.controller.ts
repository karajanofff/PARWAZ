import { Request, Response, NextFunction } from "express";
import * as service from "../services/report.service.js";

export async function summary(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.getSummaryReport());
  } catch (error) {
    next(error);
  }
}

export async function exportCsv(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await service.getSummaryReport();
    res.header("Content-Type", "text/csv; charset=utf-8");
    res.attachment("mimo-5g-hisobot.csv");
    res.send(service.toCsv(rows));
  } catch (error) {
    next(error);
  }
}

