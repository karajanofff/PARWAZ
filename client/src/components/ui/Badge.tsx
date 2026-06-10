import { AlarmSeverity, AlarmStatus, StationStatus } from "../../types";

const statusMap: Record<StationStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  WARNING: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  OFFLINE: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200",
  MAINTENANCE: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200"
};

const severityMap: Record<AlarmSeverity, string> = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200",
  CRITICAL: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
};

const alarmStatusMap: Record<AlarmStatus, string> = {
  ACTIVE: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200",
  RESOLVED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
};

export function Badge({ label, type = "status" }: { label: StationStatus | AlarmSeverity | AlarmStatus; type?: "status" | "severity" | "alarm" }) {
  const className = type === "severity" ? severityMap[label as AlarmSeverity] : type === "alarm" ? alarmStatusMap[label as AlarmStatus] : statusMap[label as StationStatus];
  const text: Record<string, string> = {
    ACTIVE: "Faol",
    WARNING: "Ogohlantirish",
    OFFLINE: "O'chgan",
    MAINTENANCE: "Servisda",
    LOW: "Past",
    MEDIUM: "O'rta",
    HIGH: "Yuqori",
    CRITICAL: "Kritik",
    RESOLVED: "Yechilgan"
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{text[label] || label}</span>;
}

