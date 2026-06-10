import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";

type KpiFilter = {
  stationId?: string;
  from?: Date;
  to?: Date;
};

export async function listKpis(filter: KpiFilter) {
  return prisma.kpiRecord.findMany({
    where: {
      stationId: filter.stationId,
      recordedAt: {
        gte: filter.from,
        lte: filter.to
      }
    },
    include: { station: { select: { id: true, name: true, region: true } } },
    orderBy: { recordedAt: "desc" },
    take: 500
  });
}

export async function getStationKpis(stationId: string) {
  return prisma.kpiRecord.findMany({
    where: { stationId },
    orderBy: { recordedAt: "desc" },
    take: 120
  });
}

export async function createKpi(data: Prisma.KpiRecordUncheckedCreateInput) {
  return prisma.kpiRecord.create({ data });
}

