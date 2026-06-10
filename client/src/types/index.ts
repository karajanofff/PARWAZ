export type Role = "ADMIN" | "OPERATOR";
export type StationStatus = "ACTIVE" | "WARNING" | "OFFLINE" | "MAINTENANCE";
export type AlarmSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type AlarmStatus = "ACTIVE" | "RESOLVED";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  isActive?: boolean;
};

export type Station = {
  id: string;
  name: string;
  region: string;
  address: string;
  latitude: number;
  longitude: number;
  mimoType: string;
  portCount: number;
  beamCount: number;
  antennaGain: number;
  eirp: number;
  temperature: number;
  status: StationStatus;
  alarms?: Alarm[];
  configuration?: Configuration;
  kpiRecords?: KpiRecord[];
};

export type KpiRecord = {
  id: string;
  stationId: string;
  rsrp: number;
  sinr: number;
  throughput: number;
  prbUsage: number;
  latency: number;
  packetLoss: number;
  coverageScore: number;
  capacityScore: number;
  recordedAt: string;
  station?: Pick<Station, "id" | "name" | "region">;
};

export type Alarm = {
  id: string;
  stationId: string;
  title: string;
  description: string;
  severity: AlarmSeverity;
  status: AlarmStatus;
  source: string;
  createdAt: string;
  resolvedAt?: string | null;
  station?: Pick<Station, "id" | "name" | "region">;
};

export type Configuration = {
  id: string;
  stationId: string;
  powerLimit: number;
  temperatureLimit: number;
  alarmThreshold: number;
  schedulerMode: string;
  beamMode: string;
  updatedAt: string;
  station?: Pick<Station, "id" | "name" | "region" | "status">;
};

