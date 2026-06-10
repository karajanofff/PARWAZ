import bcrypt from "bcrypt";
import { Prisma, UserRole } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { notFound } from "../utils/errors.js";

const userSelect = {
  id: true,
  fullName: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true
};

export async function listUsers() {
  return prisma.user.findMany({ select: userSelect, orderBy: { createdAt: "desc" } });
}

export async function createUser(data: { fullName: string; email: string; password: string; role: UserRole }) {
  const passwordHash = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { fullName: data.fullName, email: data.email, passwordHash, role: data.role },
    select: userSelect
  });
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw notFound("Foydalanuvchi");
  return prisma.user.update({ where: { id }, data, select: userSelect });
}

export async function deactivateUser(id: string) {
  return updateUser(id, { isActive: false });
}

