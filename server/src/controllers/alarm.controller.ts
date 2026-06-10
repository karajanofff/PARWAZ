import { Request, Response, NextFunction } from "express";
import { AlarmSeverity, AlarmStatus } from "@prisma/client";
import * as service from "../services/alarm.service.js";
import { writeAudit } from "../middlewares/audit.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(
      await service.listAlarms(
        req.query.severity as AlarmSeverity,
        req.query.status as AlarmStatus,
        req.query.stationId as string
      )
    );
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const alarm = await service.createAlarm(req.body);
    await writeAudit(req.user?.id, "CREATE", "Alarm", alarm.id);
    res.status(201).json(alarm);
  } catch (error) {
    next(error);
  }
}

export async function resolve(req: Request, res: Response, next: NextFunction) {
  try {
    const alarm = await service.resolveAlarm(req.params.id);
    await writeAudit(req.user?.id, "RESOLVE", "Alarm", alarm.id);
    res.json(alarm);
  } catch (error) {
    next(error);
  }
}

