import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { env } from "../config/env.js";
import { AuthUser } from "../types.js";

export function signToken(user: AuthUser) {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
}

export function verifyToken(token: string): AuthUser {
  const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role as UserRole,
    fullName: decoded.fullName
  };
}
