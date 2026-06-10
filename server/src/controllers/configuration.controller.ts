import { Request, Response, NextFunction } from "express";
import * as service from "../services/configuration.service.js";
import { writeAudit } from "../middlewares/audit.js";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.listConfigurations());
  } catch (error) {
    next(error);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.getConfiguration(req.params.stationId));
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const config = await service.updateConfiguration(req.params.stationId, req.body);
    await writeAudit(req.user?.id, "UPDATE", "Configuration", config.id);
    res.json(config);
  } catch (error) {
    next(error);
  }
}

