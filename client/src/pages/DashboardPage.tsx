import { Activity, AlarmClock, BarChart3, Gauge, RadioTower, Signal } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useFetch } from "../hooks/useFetch";
import { Alarm, KpiRecord, Station } from "../types";
import { Loading } from "../components/ui/Loading";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";

export default function DashboardPage() {
  const { data: stations, loading: stationsLoading } = useFetch<Station[]>("/stations");
  const { data: kpis, loading: kpiLoading } = useFetch<KpiRecord[]>("/kpis");
  const { data: alarms } = useFetch<Alarm[]>("/alarms?status=ACTIVE");

  if (stationsLoading || kpiLoading) return <Loading />;

  const activeStations = stations?.filter((s) => s.status === "ACTIVE").length || 0;
  const avg = (items: KpiRecord[] = [], key: keyof KpiRecord) => {
    const values = items.map((item) => Number(item[key])).filter(Number.isFinite);
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  };
  const chartData = (kpis || []).slice(0, 18).reverse().map((k) => ({
    time: new Date(k.recordedAt).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
    SINR: k.sinr,
    Throughput: k.throughput,
    Qamrov: k.coverageScore
  }));
  const statusData = ["ACTIVE", "WARNING", "OFFLINE", "MAINTENANCE"].map((status) => ({
    name: status,
    value: stations?.filter((station) => station.status === status).length || 0
  }));
  const loadData = stations?.map((s) => ({ name: s.name.split(" ")[0], yuklama: s.alarms?.length ? 88 : Math.round(45 + Math.random() * 40) })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Boshqaruv paneli</h2>
        <p className="text-sm text-slate-500">5G MIMO antenna infratuzilmasining joriy monitoring ko'rsatkichlari</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Faol stansiyalar soni" value={activeStations} hint={`${stations?.length || 0} ta umumiy stansiya`} icon={RadioTower} />
        <StatCard title="O'rtacha qamrov ko'rsatkichi" value={`${avg(kpis || [], "coverageScore").toFixed(1)}%`} icon={Signal} />
        <StatCard title="Tarmoq sig'imi" value={`${avg(kpis || [], "capacityScore").toFixed(1)}%`} icon={BarChart3} />
        <StatCard title="Faol alarm soni" value={alarms?.length || 0} icon={AlarmClock} />
        <StatCard title="O'rtacha SNR" value={`${avg(kpis || [], "sinr").toFixed(1)} dB`} icon={Gauge} />
        <StatCard title="O'rtacha throughput" value={`${avg(kpis || [], "throughput").toFixed(0)} Mbps`} icon={Activity} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card xl:col-span-2">
          <h3 className="mb-4 font-semibold dark:text-white">KPI dinamikasi</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="SINR" stroke="#1677c8" strokeWidth={2} />
                <Line type="monotone" dataKey="Qamrov" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="mb-4 font-semibold dark:text-white">Alarm statistikasi</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={92} label>
                  {statusData.map((_, index) => <Cell key={index} fill={["#16a34a", "#f59e0b", "#e11d48", "#0ea5e9"][index]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 font-semibold dark:text-white">Stansiyalar bo'yicha yuklama</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={loadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="yuklama" fill="#1677c8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card overflow-x-auto">
          <h3 className="mb-4 font-semibold dark:text-white">So'nggi alarmlar</h3>
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr><th className="py-2">Nomi</th><th>Stansiya</th><th>Daraja</th><th>Holat</th></tr>
            </thead>
            <tbody>
              {(alarms || []).slice(0, 6).map((alarm) => (
                <tr key={alarm.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-3 font-medium dark:text-white">{alarm.title}</td>
                  <td>{alarm.station?.name}</td>
                  <td><Badge label={alarm.severity} type="severity" /></td>
                  <td><Badge label={alarm.status} type="alarm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

