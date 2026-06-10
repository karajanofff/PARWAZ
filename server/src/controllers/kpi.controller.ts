import { Request, Response, NextFunction } from "express";
import * as service from "../services/kpi.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(
      await service.listKpis({
        stationId: req.query.stationId as string,
        from: req.query.from ? new Date(req.query.from as string) : undefined,
        to: req.query.to ? new Date(req.query.to as string) : undefined
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function byStation(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.getStationKpis(req.params.stationId));
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(await service.createKpi(req.body));
  } catch (error) {
    next(error);
  }
}

