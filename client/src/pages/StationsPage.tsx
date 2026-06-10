import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Trash2 } from "lucide-react";
import { api } from "../api/http";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Station, StationStatus } from "../types";
import { Badge } from "../components/ui/Badge";
import { Loading } from "../components/ui/Loading";

const initialForm = {
  name: "", region: "Qoraqalpog'iston", address: "", latitude: 42.46, longitude: 59.61,
  mimoType: "64T64R Massive MIMO", portCount: 64, beamCount: 128, antennaGain: 18, eirp: 60, temperature: 35, status: "ACTIVE" as StationStatus
};

export default function StationsPage() {
  const { isAdmin } = useAuth();
  const { data, loading, setData } = useFetch<Station[]>("/stations");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(initialForm);

  const stations = useMemo(() => (data || []).filter((s) => `${s.name} ${s.region} ${s.address}`.toLowerCase().includes(query.toLowerCase())), [data, query]);

  async function createStation(event: FormEvent) {
    event.preventDefault();
    const res = await api.post<Station>("/stations", form);
    setData([res.data, ...(data || [])]);
    setForm(initialForm);
  }

  async function deleteStation(id: string) {
    if (!confirm("Stansiyani o'chirishni tasdiqlaysizmi?")) return;
    await api.delete(`/stations/${id}`);
    setData((data || []).filter((station) => station.id !== id));
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Stansiyalar ro'yxati</h2>
          <p className="text-sm text-slate-500">Antenna obyektlari, MIMO parametrlari va joriy holat</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input className="input pl-10" placeholder="Qidirish..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {isAdmin && (
        <form onSubmit={createStation} className="card grid gap-3 md:grid-cols-4">
          <input className="input" placeholder="Stansiya nomi" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" placeholder="Manzil" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          <input className="input" placeholder="MIMO turi" value={form.mimoType} onChange={(e) => setForm({ ...form, mimoType: e.target.value })} />
          <button className="btn-primary"><Plus size={18} /> Qo'shish</button>
        </form>
      )}

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr><th className="py-2">Stansiya</th><th>Hudud</th><th>MIMO turi</th><th>Port</th><th>Beam</th><th>Harorat</th><th>Holat</th><th>Amal</th></tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="py-3 font-semibold"><Link className="text-brand-700 hover:underline" to={`/stations/${station.id}`}>{station.name}</Link></td>
                <td>{station.region}</td>
                <td>{station.mimoType}</td>
                <td>{station.portCount}</td>
                <td>{station.beamCount}</td>
                <td>{station.temperature} °C</td>
                <td><Badge label={station.status} /></td>
                <td>{isAdmin && <button className="text-rose-600" onClick={() => deleteStation(station.id)} title="O'chirish"><Trash2 size={18} /></button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

