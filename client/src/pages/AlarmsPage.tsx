import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { api } from "../api/http";
import { useFetch } from "../hooks/useFetch";
import { Alarm, AlarmSeverity, AlarmStatus } from "../types";
import { Badge } from "../components/ui/Badge";
import { Loading } from "../components/ui/Loading";

export default function AlarmsPage() {
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const query = [`severity=${severity}`, `status=${status}`].filter((x) => !x.endsWith("=")).join("&");
  const { data, loading, setData } = useFetch<Alarm[]>(`/alarms${query ? `?${query}` : ""}`, [severity, status]);

  async function resolve(id: string) {
    const res = await api.put<Alarm>(`/alarms/${id}/resolve`);
    setData((data || []).map((alarm) => (alarm.id === id ? res.data : alarm)));
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold dark:text-white">Alarmlar</h2><p className="text-sm text-slate-500">Faol va yechilgan ogohlantirishlar monitoringi</p></div>
      <div className="card grid gap-3 md:grid-cols-3">
        <select className="input" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">Barcha darajalar</option>
          {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as AlarmSeverity[]).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Barcha holatlar</option>
          {(["ACTIVE", "RESOLVED"] as AlarmStatus[]).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500"><tr><th className="py-2">Alarm</th><th>Stansiya</th><th>Manba</th><th>Daraja</th><th>Holat</th><th>Vaqt</th><th>Amal</th></tr></thead>
          <tbody>
            {(data || []).map((alarm) => (
              <tr key={alarm.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="py-3"><b>{alarm.title}</b><p className="text-xs text-slate-500">{alarm.description}</p></td>
                <td>{alarm.station?.name}</td>
                <td>{alarm.source}</td>
                <td><Badge label={alarm.severity} type="severity" /></td>
                <td><Badge label={alarm.status} type="alarm" /></td>
                <td>{new Date(alarm.createdAt).toLocaleString("uz-UZ")}</td>
                <td>{alarm.status === "ACTIVE" && <button className="btn-secondary px-3" onClick={() => resolve(alarm.id)}><CheckCircle size={16} /> Yechish</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

