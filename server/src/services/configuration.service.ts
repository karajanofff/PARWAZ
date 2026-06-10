import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { notFound } from "../utils/errors.js";

export async function listConfigurations() {
  return prisma.configuration.findMany({
    include: { station: { select: { id: true, name: true, region: true, status: true } } },
    orderBy: { station: { name: "asc" } }
  });
}

export async function getConfiguration(stationId: string) {
  const config = await prisma.configuration.findUnique({
    where: { stationId },
    include: { station: true }
  });
  if (!config) throw notFound("Konfiguratsiya");
  return config;
}

export async function updateConfiguration(stationId: string, data: Prisma.ConfigurationUpdateInput) {
  await getConfiguration(stationId);
  return prisma.configuration.update({ where: { stationId }, data });
}

