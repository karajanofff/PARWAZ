import { Station } from "../types";

export function getStationStatusReason(station: Station) {
  const activeAlarm = station.alarms?.find((alarm) => alarm.status === "ACTIVE");
  if (activeAlarm) {
    return `${activeAlarm.title}: ${activeAlarm.description}`;
  }

  if (station.status === "OFFLINE") {
    return "Stansiya bilan aloqa yo'q yoki elektr ta'minoti uzilgan bo'lishi mumkin.";
  }

  if (station.status === "WARNING") {
    if (station.temperature >= 40) {
      return "Harorat yuqori, sovitish tizimi yoki antenna modulini tekshirish kerak.";
    }
    return "KPI ko'rsatkichlarida og'ish bor, RF parametrlarini tekshirish kerak.";
  }

  if (station.status === "MAINTENANCE") {
    return "Stansiya rejalashtirilgan texnik xizmat rejimida.";
  }

  return "Stansiya normal rejimda ishlamoqda.";
}

