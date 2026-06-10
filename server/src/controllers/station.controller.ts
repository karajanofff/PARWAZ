import { Request, Response, NextFunction } from "express";
import { StationStatus } from "@prisma/client";
import * as service from "../services/station.service.js";
import { writeAudit } from "../middlewares/audit.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.listStations(req.query.q as string, req.query.status as StationStatus));
  } catch (error) {
    next(error);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.getStation(req.params.id));
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const station = await service.createStation(req.body);
    await writeAudit(req.user?.id, "CREATE", "Station", station.id);
    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const station = await service.updateStation(req.params.id, req.body);
    await writeAudit(req.user?.id, "UPDATE", "Station", station.id);
    res.json(station);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const station = await service.deleteStation(req.params.id);
    await writeAudit(req.user?.id, "DELETE", "Station", station.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

