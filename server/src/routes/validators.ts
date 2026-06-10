import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const stationSchema = z.object({
  name: z.string().min(2),
  region: z.string().min(2),
  address: z.string().min(2),
  latitude: z.number(),
  longitude: z.number(),
  mimoType: z.string().min(2),
  portCount: z.number().int().positive(),
  beamCount: z.number().int().positive(),
  antennaGain: z.number(),
  eirp: z.number(),
  temperature: z.number(),
  status: z.enum(["ACTIVE", "WARNING", "OFFLINE", "MAINTENANCE"]).optional()
});

export const kpiSchema = z.object({
  stationId: z.string().min(1),
  rsrp: z.number(),
  sinr: z.number(),
  throughput: z.number(),
  prbUsage: z.number(),
  latency: z.number(),
  packetLoss: z.number(),
  coverageScore: z.number(),
  capacityScore: z.number(),
  recordedAt: z.string().datetime().optional()
});

export const alarmSchema = z.object({
  stationId: z.string().min(1),
  title: z.string().min(2),
  description: z.string().min(2),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  status: z.enum(["ACTIVE", "RESOLVED"]).optional(),
  source: z.string().min(2)
});

export const configurationSchema = z.object({
  powerLimit: z.number(),
  temperatureLimit: z.number(),
  alarmThreshold: z.number(),
  schedulerMode: z.string().min(2),
  beamMode: z.string().min(2)
});

export const userCreateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "OPERATOR"])
});

export const userUpdateSchema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "OPERATOR"]).optional(),
  isActive: z.boolean().optional()
});

