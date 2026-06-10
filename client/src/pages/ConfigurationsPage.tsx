import { useState } from "react";
import { Save } from "lucide-react";
import { api } from "../api/http";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Configuration } from "../types";
import { Loading } from "../components/ui/Loading";
import { Badge } from "../components/ui/Badge";

export default function ConfigurationsPage() {
  const { isAdmin } = useAuth();
  const { data, loading, setData } = useFetch<Configuration[]>("/configurations");
  const [editing, setEditing] = useState<Record<string, Partial<Configuration>>>({});

  async function save(config: Configuration) {
    const payload = editing[config.stationId] || {};
    const res = await api.put<Configuration>(`/configurations/${config.stationId}`, payload);
    setData((data || []).map((item) => (item.id === config.id ? res.data : item)));
    setEditing({ ...editing, [config.stationId]: {} });
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold dark:text-white">Konfiguratsiya</h2><p className="text-sm text-slate-500">Threshold, quvvat, scheduler va beam rejimi sozlamalari</p></div>
      <div className="grid gap-4 xl:grid-cols-2">
        {(data || []).map((config) => {
          const draft = { ...config, ...(editing[config.stationId] || {}) };
          return (
            <div key={config.id} className="card space-y-4">
              <div className="flex items-center justify-between"><div><h3 className="font-semibold dark:text-white">{config.station?.name}</h3><p className="text-xs text-slate-500">{config.station?.region}</p></div>{config.station?.status && <Badge label={config.station.status} />}</div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["Quvvat limiti", "powerLimit"], ["Harorat limiti", "temperatureLimit"], ["Alarm limiti", "alarmThreshold"]
                ].map(([label, key]) => <label key={key} className="text-sm">{label}<input className="input mt-1" type="number" disabled={!isAdmin} value={Number(draft[key as keyof Configuration])} onChange={(e) => setEditing({ ...editing, [config.stationId]: { ...editing[config.stationId], [key]: Number(e.target.value) } })} /></label>)}
                <label className="text-sm">Scheduler<input className="input mt-1" disabled={!isAdmin} value={String(draft.schedulerMode)} onChange={(e) => setEditing({ ...editing, [config.stationId]: { ...editing[config.stationId], schedulerMode: e.target.value } })} /></label>
                <label className="text-sm md:col-span-2">Beam rejimi<input className="input mt-1" disabled={!isAdmin} value={String(draft.beamMode)} onChange={(e) => setEditing({ ...editing, [config.stationId]: { ...editing[config.stationId], beamMode: e.target.value } })} /></label>
              </div>
              {isAdmin && <button className="btn-primary" onClick={() => save(config)}><Save size={17} /> Saqlash</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

