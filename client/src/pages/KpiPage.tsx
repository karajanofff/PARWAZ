import { useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useFetch } from "../hooks/useFetch";
import { KpiRecord, Station } from "../types";
import { StatCard } from "../components/ui/StatCard";
import { Activity, Gauge, Network, Timer } from "lucide-react";
import { Loading } from "../components/ui/Loading";

export default function KpiPage() {
  const [stationId, setStationId] = useState("");
  const { data: stations } = useFetch<Station[]>("/stations");
  const { data: kpis, loading } = useFetch<KpiRecord[]>(`/kpis${stationId ? `?stationId=${stationId}` : ""}`, [stationId]);
  const avg = (key: keyof KpiRecord) => {
    const values = (kpis || []).map((item) => Number(item[key])).filter(Number.isFinite);
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  };
  const chart = useMemo(() => (kpis || []).slice(0, 30).reverse().map((k) => ({ time: new Date(k.recordedAt).toLocaleDateString("uz-UZ"), SINR: k.sinr, RSRP: k.rsrp, Throughput: k.throughput })), [kpis]);
  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div><h2 className="text-2xl font-bold dark:text-white">KPI monitoring</h2><p className="text-sm text-slate-500">RSRP, SINR, throughput, PRB va kechikish tahlili</p></div>
        <select className="input md:w-80" value={stationId} onChange={(e) => setStationId(e.target.value)}>
          <option value="">Barcha stansiyalar</option>
          {(stations || []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="O'rtacha SINR" value={`${avg("sinr").toFixed(1)} dB`} icon={Gauge} />
        <StatCard title="Throughput" value={`${avg("throughput").toFixed(0)} Mbps`} icon={Activity} />
        <StatCard title="PRB utilization" value={`${avg("prbUsage").toFixed(1)}%`} icon={Network} />
        <StatCard title="Latency" value={`${avg("latency").toFixed(1)} ms`} icon={Timer} />
      </div>
      <div className="card">
        <h3 className="mb-4 font-semibold dark:text-white">KPI chiziqli grafigi</h3>
        <div className="h-80"><ResponsiveContainer><LineChart data={chart}><XAxis dataKey="time" /><YAxis /><Tooltip /><Line dataKey="SINR" stroke="#1677c8" /><Line dataKey="Throughput" stroke="#16a34a" /><Line dataKey="RSRP" stroke="#f97316" /></LineChart></ResponsiveContainer></div>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500"><tr><th className="py-2">Stansiya</th><th>RSRP</th><th>SINR</th><th>Throughput</th><th>PRB</th><th>Latency</th><th>Packet loss</th><th>Qamrov</th><th>Sig'im</th><th>Vaqt</th></tr></thead>
          <tbody>{(kpis || []).slice(0, 80).map((k) => <tr key={k.id} className="border-t border-slate-100 dark:border-slate-800"><td className="py-3 font-medium">{k.station?.name}</td><td>{k.rsrp}</td><td>{k.sinr}</td><td>{k.throughput}</td><td>{k.prbUsage}%</td><td>{k.latency} ms</td><td>{k.packetLoss}%</td><td>{k.coverageScore}%</td><td>{k.capacityScore}%</td><td>{new Date(k.recordedAt).toLocaleString("uz-UZ")}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

