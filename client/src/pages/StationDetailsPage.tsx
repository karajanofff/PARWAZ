import { useParams } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StationMap } from "../components/StationMap";
import { Badge } from "../components/ui/Badge";
import { Loading } from "../components/ui/Loading";
import { useFetch } from "../hooks/useFetch";
import { Station } from "../types";

export default function StationDetailsPage() {
  const { id } = useParams();
  const { data: station, loading } = useFetch<Station>(`/stations/${id}`, [id]);
  if (loading || !station) return <Loading />;

  const kpis = (station.kpiRecords || []).slice().reverse().map((k) => ({ time: new Date(k.recordedAt).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }), sinr: k.sinr, throughput: k.throughput }));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">{station.name}</h2>
          <p className="text-sm text-slate-500">{station.address}</p>
        </div>
        <Badge label={station.status} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <StationMap latitude={station.latitude} longitude={station.longitude} name={station.name} />
        </div>
        <div className="card space-y-3 text-sm">
          <h3 className="font-semibold dark:text-white">Texnik parametrlar</h3>
          {[["Sektor", station.region], ["MIMO turi", station.mimoType], ["Portlar soni", station.portCount], ["Beam soni", station.beamCount], ["EIRP", `${station.eirp} dBm`], ["Antenna gain", `${station.antennaGain} dBi`], ["Harorat", `${station.temperature} °C`]].map(([k, v]) => (
            <div key={String(k)} className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800"><span className="text-slate-500">{k}</span><b>{v}</b></div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 font-semibold dark:text-white">So'nggi KPI ko'rsatkichlari</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={kpis}>
                <XAxis dataKey="time" /><YAxis /><Tooltip />
                <Line dataKey="sinr" stroke="#1677c8" strokeWidth={2} />
                <Line dataKey="throughput" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="mb-4 font-semibold dark:text-white">Konfiguratsiya sozlamalari</h3>
          <div className="space-y-3 text-sm">
            <p>Quvvat limiti: <b>{station.configuration?.powerLimit} dBm</b></p>
            <p>Harorat limiti: <b>{station.configuration?.temperatureLimit} °C</b></p>
            <p>Alarm limiti: <b>{station.configuration?.alarmThreshold}%</b></p>
            <p>Scheduler: <b>{station.configuration?.schedulerMode}</b></p>
            <p>Beam rejimi: <b>{station.configuration?.beamMode}</b></p>
          </div>
          <h3 className="mt-6 mb-3 font-semibold dark:text-white">So'nggi alarmlar</h3>
          <div className="space-y-2">
            {(station.alarms || []).map((alarm) => (
              <div key={alarm.id} className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-center justify-between"><b>{alarm.title}</b><Badge label={alarm.severity} type="severity" /></div>
                <p className="mt-1 text-sm text-slate-500">{alarm.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

