import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/errors.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new AppError(401, "Avtorizatsiya tokeni talab qilinadi"));
  }

  try {
    req.user = verifyToken(header.replace("Bearer ", ""));
    next();
  } catch {
    next(new AppError(401, "Token yaroqsiz yoki muddati tugagan"));
  }
}

export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError(403, "Bu amal uchun ruxsat yo'q"));
    }
    next();
  };
}

