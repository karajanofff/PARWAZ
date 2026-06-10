import { AlarmSeverity, AlarmStatus, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { notFound } from "../utils/errors.js";

export async function listAlarms(severity?: AlarmSeverity, status?: AlarmStatus, stationId?: string) {
  return prisma.alarm.findMany({
    where: { severity, status, stationId },
    include: { station: { select: { id: true, name: true, region: true } } },
    orderBy: { createdAt: "desc" }
  });
}

export async function createAlarm(data: Prisma.AlarmUncheckedCreateInput) {
  return prisma.alarm.create({ data });
}

export async function resolveAlarm(id: string) {
  const alarm = await prisma.alarm.findUnique({ where: { id } });
  if (!alarm) throw notFound("Alarm");
  return prisma.alarm.update({
    where: { id },
    data: { status: "RESOLVED", resolvedAt: new Date() }
  });
}

