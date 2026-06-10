import { useMemo, useState } from "react";
import { MapPin, RadioTower, Search, Signal, Wrench } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { Station, StationStatus } from "../types";
import { Loading } from "../components/ui/Loading";
import { EmptyState } from "../components/ui/EmptyState";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { StationMapView } from "../components/map/StationMapView";
import { MapLegend } from "../components/map/MapLegend";
import { getStationStatusReason } from "../utils/stationStatus";

export default function MapPage() {
  const { data, loading, error } = useFetch<Station[]>("/stations");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [region, setRegion] = useState("");
  const [selectedStationId, setSelectedStationId] = useState("");

  const regions = useMemo(() => Array.from(new Set((data || []).map((station) => station.region))).sort(), [data]);
  const stations = useMemo(
    () =>
      (data || []).filter((station) => {
        const matchesQuery = `${station.name} ${station.region} ${station.address}`.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status ? station.status === status : true;
        const matchesRegion = region ? station.region === region : true;
        return matchesQuery && matchesStatus && matchesRegion;
      }),
    [data, query, region, status]
  );

  const activeCount = stations.filter((station) => station.status === "ACTIVE").length;
  const warningCount = stations.filter((station) => station.status === "WARNING").length;
  const offlineCount = stations.filter((station) => station.status === "OFFLINE").length;
  const maintenanceCount = stations.filter((station) => station.status === "MAINTENANCE").length;

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Stansiyalar xaritasi</h2>
        <p className="text-sm text-slate-500">5G MIMO antenna stansiyalarining geografik joylashuvi va holatini real vaqtga yaqin kuzatish</p>
      </div>

      {error && <div className="rounded-md bg-rose-50 p-4 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">{error}</div>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Xaritadagi stansiyalar" value={stations.length} hint="Filtr natijasi" icon={MapPin} />
        <StatCard title="Faol stansiyalar" value={activeCount} hint="Normal ishlamoqda" icon={RadioTower} />
        <StatCard title="Ogohlantirish" value={warningCount + offlineCount} hint="Tekshiruv talab qiladi" icon={Signal} />
        <StatCard title="Ta'mirlash" value={maintenanceCount} hint="Servis rejimi" icon={Wrench} />
      </div>

      <div className="card grid gap-3 lg:grid-cols-4">
        <label className="relative lg:col-span-2">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input className="input pl-10" placeholder="Stansiya nomi yoki manzil bo'yicha qidirish..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <select className="input" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">Barcha holatlar</option>
          <option value="ACTIVE">Faol</option>
          <option value="WARNING">Ogohlantirish</option>
          <option value="OFFLINE">Kritik</option>
          <option value="MAINTENANCE">Ta'mirlash</option>
        </select>
        <select className="input" value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="">Barcha hududlar</option>
          {regions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <MapLegend />

      {stations.length ? (
        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <StationMapView stations={stations} selectedStationId={selectedStationId} />
          <div className="card max-h-[620px] overflow-y-auto">
            <h3 className="mb-4 font-semibold dark:text-white">Stansiyalar ro'yxati</h3>
            <div className="space-y-3">
              {stations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => setSelectedStationId(station.id)}
                  className={`w-full rounded-lg border p-3 text-left transition hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-slate-800 ${
                    selectedStationId === station.id ? "border-brand-500 bg-brand-50 dark:bg-slate-800" : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold dark:text-white">{station.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{station.address}</p>
                    </div>
                    <Badge label={station.status} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <span>MIMO: <b className="text-slate-700 dark:text-slate-200">{station.mimoType}</b></span>
                    <span>Port: <b className="text-slate-700 dark:text-slate-200">{station.portCount}</b></span>
                    <span>Beam: <b className="text-slate-700 dark:text-slate-200">{station.beamCount}</b></span>
                    <span>Harorat: <b className="text-slate-700 dark:text-slate-200">{station.temperature} °C</b></span>
                  </div>
                  <div className="mt-3 rounded-md bg-slate-50 p-2 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                    <span className="font-semibold">Sababi: </span>{getStationStatusReason(station)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyState text="Tanlangan filtr bo'yicha stansiya topilmadi" />
      )}
    </div>
  );
}
