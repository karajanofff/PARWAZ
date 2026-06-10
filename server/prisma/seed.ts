import bcrypt from "bcrypt";
import { PrismaClient, StationStatus, AlarmSeverity } from "@prisma/client";

const prisma = new PrismaClient();

const stations = [
  ["Nukus Markaz-1", "Qoraqalpog'iston", "Nukus shahri, Amir Temur ko'chasi", 42.4619, 59.6166, "64T64R Massive MIMO", 64, 128, 18.5, 62, 36, "ACTIVE"],
  ["Beruniy Sektor-A", "Qoraqalpog'iston", "Beruniy tumani, markaziy minora", 41.6911, 60.7525, "32T32R MIMO", 32, 96, 17.2, 58, 39, "WARNING"],
  ["To'rtko'l 5G Hub", "Qoraqalpog'iston", "To'rtko'l tumani, sanoat zonasi", 41.5519, 61.0064, "64T64R Massive MIMO", 64, 144, 19.1, 63, 34, "ACTIVE"],
  ["Xo'jayli Node-2", "Qoraqalpog'iston", "Xo'jayli tumani, telekom obyekt", 42.4003, 59.4601, "16T16R MIMO", 16, 48, 15.8, 51, 42, "ACTIVE"],
  ["Qo'ng'irot Massive MIMO-1", "Qoraqalpog'iston", "Qo'ng'irot shahri, magistral yo'l", 43.0476, 58.8456, "64T64R Massive MIMO", 64, 160, 19.4, 64, 45, "WARNING"],
  ["Chimboy BeamGrid", "Qoraqalpog'iston", "Chimboy tumani, bozor hududi", 42.9295, 59.7814, "32T32R MIMO", 32, 88, 16.9, 56, 37, "ACTIVE"],
  ["Taxiatosh-5G-Relay", "Qoraqalpog'iston", "Taxiatosh shahri, GES yonida", 42.3344, 59.5612, "16T16R MIMO", 16, 40, 15.2, 50, 33, "MAINTENANCE"],
  ["Mo'ynoq Coast-1", "Qoraqalpog'iston", "Mo'ynoq tumani, qirg'oq zonasi", 43.7683, 59.0304, "32T32R MIMO", 32, 76, 16.5, 55, 31, "ACTIVE"],
  ["Ellikqal'a Sector-B", "Qoraqalpog'iston", "Ellikqal'a tumani, aholi punkti", 41.9287, 60.9901, "32T32R MIMO", 32, 92, 17.4, 57, 38, "ACTIVE"],
  ["Amudaryo SmartCell", "Qoraqalpog'iston", "Amudaryo tumani, markaz", 42.1127, 60.0437, "64T64R Massive MIMO", 64, 132, 18.9, 61, 40, "OFFLINE"]
] as const;

const alarmTitles = [
  "Harorat chegaradan oshdi",
  "SNR pasayishi aniqlandi",
  "Port sinxronizatsiyasi uzildi",
  "PRB yuklamasi yuqori",
  "Beamforming kalibrlash ogohlantirishi"
];

function randomBetween(min: number, max: number) {
  return Number((min + Math.random() * (max - min)).toFixed(2));
}

async function main() {
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0 && process.env.RESET_DATABASE !== "true") {
    console.log("Seed o'tkazib yuborildi: bazada ma'lumot mavjud");
    return;
  }

  if (process.env.RESET_DATABASE === "true") {
    await prisma.auditLog.deleteMany();
    await prisma.alarm.deleteMany();
    await prisma.kpiRecord.deleteMany();
    await prisma.configuration.deleteMany();
    await prisma.station.deleteMany();
    await prisma.user.deleteMany();
  }

  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const operatorPassword = await bcrypt.hash("Operator123!", 10);

  await prisma.user.createMany({
    data: [
      { fullName: "Tizim Administratori", email: "admin@mimo.uz", passwordHash: adminPassword, role: "ADMIN" },
      { fullName: "Monitoring Operatori", email: "operator@mimo.uz", passwordHash: operatorPassword, role: "OPERATOR" }
    ]
  });

  for (const [index, item] of stations.entries()) {
    const station = await prisma.station.create({
      data: {
        name: item[0],
        region: item[1],
        address: item[2],
        latitude: item[3],
        longitude: item[4],
        mimoType: item[5],
        portCount: item[6],
        beamCount: item[7],
        antennaGain: item[8],
        eirp: item[9],
        temperature: item[10],
        status: item[11] as StationStatus,
        configuration: {
          create: {
            powerLimit: randomBetween(55, 65),
            temperatureLimit: randomBetween(60, 75),
            alarmThreshold: randomBetween(75, 90),
            schedulerMode: index % 2 === 0 ? "QoS asosida" : "Proportional Fair",
            beamMode: index % 3 === 0 ? "Avtomatik beam tracking" : "Statik sektor beam"
          }
        }
      }
    });

    for (let hour = 0; hour < 36; hour++) {
      const recordedAt = new Date(Date.now() - hour * 60 * 60 * 1000);
      await prisma.kpiRecord.create({
        data: {
          stationId: station.id,
          rsrp: randomBetween(-103, -72),
          sinr: randomBetween(8, 28),
          throughput: randomBetween(220, 980),
          prbUsage: randomBetween(35, 91),
          latency: randomBetween(6, 34),
          packetLoss: randomBetween(0.05, 2.8),
          coverageScore: randomBetween(72, 99),
          capacityScore: randomBetween(68, 98),
          recordedAt
        }
      });
    }

    if (index % 2 === 0 || item[11] !== "ACTIVE") {
      const severity = (["LOW", "MEDIUM", "HIGH", "CRITICAL"] as AlarmSeverity[])[index % 4];
      await prisma.alarm.create({
        data: {
          stationId: station.id,
          title: alarmTitles[index % alarmTitles.length],
          description: `${station.name} bo'yicha monitoring tizimi ${severity.toLowerCase()} darajadagi ogohlantirish qayd etdi.`,
          severity,
          status: index % 5 === 0 ? "RESOLVED" : "ACTIVE",
          source: index % 2 === 0 ? "RF modul" : "KPI analizatori",
          createdAt: new Date(Date.now() - index * 3 * 60 * 60 * 1000),
          resolvedAt: index % 5 === 0 ? new Date(Date.now() - index * 60 * 60 * 1000) : null
        }
      });
    }
  }

  console.log("Seed ma'lumotlari yaratildi");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
