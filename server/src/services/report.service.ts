import { prisma } from "../config/prisma.js";

export async function getSummaryReport() {
  const stations = await prisma.station.findMany({
    include: {
      kpiRecords: { orderBy: { recordedAt: "desc" }, take: 20 },
      alarms: { where: { status: "ACTIVE" } }
    },
    orderBy: { name: "asc" }
  });

  return stations.map((station) => {
    const avg = (key: keyof (typeof station.kpiRecords)[number]) => {
      const values = station.kpiRecords.map((record) => Number(record[key])).filter(Number.isFinite);
      return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    };

    return {
      stationId: station.id,
      stationName: station.name,
      region: station.region,
      status: station.status,
      avgSinr: Number(avg("sinr").toFixed(2)),
      avgThroughput: Number(avg("throughput").toFixed(2)),
      avgCoverage: Number(avg("coverageScore").toFixed(2)),
      activeAlarms: station.alarms.length
    };
  });
}

export function toCsv(rows: Awaited<ReturnType<typeof getSummaryReport>>) {
  const header = ["Stansiya", "Hudud", "Holat", "O'rtacha SINR", "Throughput", "Qamrov", "Faol alarmlar"];
  const lines = rows.map((row) =>
    [row.stationName, row.region, row.status, row.avgSinr, row.avgThroughput, row.avgCoverage, row.activeAlarms]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

