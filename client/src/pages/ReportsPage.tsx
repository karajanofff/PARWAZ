import { Download, Printer } from "lucide-react";
import { api } from "../api/http";
import { useFetch } from "../hooks/useFetch";
import { Loading } from "../components/ui/Loading";
import { Badge } from "../components/ui/Badge";
import { StationStatus } from "../types";

type ReportRow = { stationId: string; stationName: string; region: string; status: StationStatus; avgSinr: number; avgThroughput: number; avgCoverage: number; activeAlarms: number };

export default function ReportsPage() {
  const { data, loading } = useFetch<ReportRow[]>("/reports/summary");
  async function downloadCsv() {
    const res = await api.get("/reports/export/csv", { responseType: "blob" });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mimo-5g-hisobot.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  if (loading) return <Loading />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div><h2 className="text-2xl font-bold dark:text-white">Hisobotlar</h2><p className="text-sm text-slate-500">Stansiyalar kesimidagi KPI va alarm umumlashmasi</p></div>
        <div className="flex gap-2"><button className="btn-secondary" onClick={() => window.print()}><Printer size={17} /> Chop etish</button><button className="btn-primary" onClick={downloadCsv}><Download size={17} /> Hisobotni yuklab olish</button></div>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500"><tr><th className="py-2">Stansiya</th><th>Hudud</th><th>Holat</th><th>O'rtacha SINR</th><th>Throughput</th><th>Qamrov</th><th>Faol alarmlar</th></tr></thead>
          <tbody>{(data || []).map((row) => <tr key={row.stationId} className="border-t border-slate-100 dark:border-slate-800"><td className="py-3 font-semibold">{row.stationName}</td><td>{row.region}</td><td><Badge label={row.status} /></td><td>{row.avgSinr} dB</td><td>{row.avgThroughput} Mbps</td><td>{row.avgCoverage}%</td><td>{row.activeAlarms}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="card print:block">
        <h3 className="font-semibold dark:text-white">Chop etiladigan qisqa xulosa</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Monitoring natijalariga ko'ra tarmoqdagi stansiyalar holati, o'rtacha SINR, throughput va qamrov ballari mudofaa taqdimoti uchun jamlandi.</p>
      </div>
    </div>
  );
}

