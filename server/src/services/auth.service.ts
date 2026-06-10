import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/errors.js";
import { signToken } from "../utils/jwt.js";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    throw new AppError(401, "Email yoki parol noto'g'ri");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new AppError(401, "Email yoki parol noto'g'ri");
  }

  const safeUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  };

  return { user: safeUser, token: signToken(safeUser) };
}

