import { FormEvent, useState } from "react";
import { UserPlus } from "lucide-react";
import { api } from "../api/http";
import { useFetch } from "../hooks/useFetch";
import { Role, User } from "../types";
import { Loading } from "../components/ui/Loading";

export default function UsersPage() {
  const { data, loading, setData } = useFetch<User[]>("/users");
  const [form, setForm] = useState({ fullName: "", email: "", password: "User123!", role: "OPERATOR" as Role });

  async function create(event: FormEvent) {
    event.preventDefault();
    const res = await api.post<User>("/users", form);
    setData([res.data, ...(data || [])]);
    setForm({ fullName: "", email: "", password: "User123!", role: "OPERATOR" });
  }

  async function updateRole(id: string, role: Role) {
    const res = await api.put<User>(`/users/${id}`, { role });
    setData((data || []).map((u) => (u.id === id ? res.data : u)));
  }

  async function deactivate(id: string) {
    const res = await api.delete<User>(`/users/${id}`);
    setData((data || []).map((u) => (u.id === id ? res.data : u)));
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold dark:text-white">Foydalanuvchilar</h2><p className="text-sm text-slate-500">Administrator va operator rollarini boshqarish</p></div>
      <form onSubmit={create} className="card grid gap-3 md:grid-cols-5">
        <input className="input" placeholder="F.I.Sh." value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="input" placeholder="Parol" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}><option value="OPERATOR">Operator</option><option value="ADMIN">Administrator</option></select>
        <button className="btn-primary"><UserPlus size={17} /> Yaratish</button>
      </form>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500"><tr><th className="py-2">Foydalanuvchi</th><th>Email</th><th>Rol</th><th>Holat</th><th>Amal</th></tr></thead>
          <tbody>{(data || []).map((user) => <tr key={user.id} className="border-t border-slate-100 dark:border-slate-800"><td className="py-3 font-semibold">{user.fullName}</td><td>{user.email}</td><td><select className="input w-40" value={user.role} onChange={(e) => updateRole(user.id, e.target.value as Role)}><option value="OPERATOR">Operator</option><option value="ADMIN">Administrator</option></select></td><td>{user.isActive ? "Faol" : "Bloklangan"}</td><td><button className="btn-secondary" onClick={() => deactivate(user.id)}>Deaktiv qilish</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

