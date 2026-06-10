import { prisma } from "../config/prisma.js";

export async function writeAudit(userId: string | undefined, action: string, entity: string, entityId?: string) {
  await prisma.auditLog.create({
    data: { userId, action, entity, entityId }
  });
}

