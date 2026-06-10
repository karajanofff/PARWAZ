import { StationStatus } from "../../types";
import { getMarkerColor, getStatusLabel } from "./StationMarker";

const statuses: StationStatus[] = ["ACTIVE", "WARNING", "OFFLINE", "MAINTENANCE"];

export function MapLegend() {
  return (
    <div className="card">
      <h3 className="mb-3 font-semibold dark:text-white">Holat belgisi</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statuses.map((status) => (
          <div key={status} className="flex items-center gap-2 text-sm">
            <span className="h-4 w-4 rounded-full border-2 border-white shadow" style={{ backgroundColor: getMarkerColor(status) }} />
            <span className="font-medium dark:text-slate-100">{getStatusLabel(status)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

