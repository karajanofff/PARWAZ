import { Request, Response, NextFunction } from "express";
import * as service from "../services/user.service.js";
import { writeAudit } from "../middlewares/audit.js";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.listUsers());
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.createUser(req.body);
    await writeAudit(req.user?.id, "CREATE", "User", user.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.updateUser(req.params.id, req.body);
    await writeAudit(req.user?.id, "UPDATE", "User", user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.deactivateUser(req.params.id);
    await writeAudit(req.user?.id, "DEACTIVATE", "User", user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

