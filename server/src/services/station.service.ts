import { Prisma, StationStatus } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { notFound } from "../utils/errors.js";

export async function listStations(query?: string, status?: StationStatus) {
  return prisma.station.findMany({
    where: {
      status,
      OR: query
        ? [
            { name: { contains: query, mode: "insensitive" } },
            { region: { contains: query, mode: "insensitive" } },
            { address: { contains: query, mode: "insensitive" } }
          ]
        : undefined
    },
    include: { configuration: true, alarms: { where: { status: "ACTIVE" } } },
    orderBy: { name: "asc" }
  });
}

export async function getStation(id: string) {
  const station = await prisma.station.findUnique({
    where: { id },
    include: {
      configuration: true,
      kpiRecords: { orderBy: { recordedAt: "desc" }, take: 24 },
      alarms: { orderBy: { createdAt: "desc" }, take: 10 }
    }
  });
  if (!station) throw notFound("Stansiya");
  return station;
}

export async function createStation(data: Prisma.StationCreateInput) {
  return prisma.station.create({ data });
}

export async function updateStation(id: string, data: Prisma.StationUpdateInput) {
  await getStation(id);
  return prisma.station.update({ where: { id }, data });
}

export async function deleteStation(id: string) {
  await getStation(id);
  return prisma.station.delete({ where: { id } });
}

