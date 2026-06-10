import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Station, StationStatus } from "../../types";
import { Badge } from "../ui/Badge";
import { getStationStatusReason } from "../../utils/stationStatus";

const markerColors: Record<StationStatus, string> = {
  ACTIVE: "#16a34a",
  WARNING: "#f59e0b",
  OFFLINE: "#e11d48",
  MAINTENANCE: "#0ea5e9"
};

export function getStatusLabel(status: StationStatus) {
  const labels: Record<StationStatus, string> = {
    ACTIVE: "Faol",
    WARNING: "Ogohlantirish",
    OFFLINE: "Kritik",
    MAINTENANCE: "Ta'mirlash"
  };
  return labels[status];
}

export function getMarkerColor(status: StationStatus) {
  return markerColors[status];
}

function createStationIcon(status: StationStatus) {
  const color = markerColors[status];
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 30px;
        height: 30px;
        border-radius: 999px;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.28);
        position: relative;
      ">
        <div style="
          position: absolute;
          inset: 6px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.85);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14]
  });
}

export function StationMarker({ station }: { station: Station }) {
  const reason = getStationStatusReason(station);

  return (
    <Marker position={[station.latitude, station.longitude]} icon={createStationIcon(station.status)}>
      <Popup minWidth={280}>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stansiya nomi</p>
            <h3 className="text-base font-bold text-slate-950">{station.name}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Info label="Hudud" value={station.region} />
            <div>
              <p className="text-xs text-slate-500">Holati</p>
              <Badge label={station.status} />
            </div>
            <Info label="MIMO turi" value={station.mimoType} />
            <Info label="Portlar soni" value={station.portCount} />
            <Info label="Beamlar soni" value={station.beamCount} />
            <Info label="Antenna kuchaytirishi" value={`${station.antennaGain} dBi`} />
            <Info label="EIRP" value={`${station.eirp} dBm`} />
            <Info label="Harorat" value={`${station.temperature} °C`} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Manzil</p>
            <p className="font-medium text-slate-800">{station.address}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-2">
            <p className="text-xs font-semibold text-slate-500">Sababi</p>
            <p className="text-xs font-medium text-slate-800">{reason}</p>
          </div>
          <div className="text-xs text-slate-500">
            Koordinata: {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
          </div>
          <Link className="inline-flex rounded-md bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700" to={`/stations/${station.id}`}>
            Batafsil ko'rish
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}
