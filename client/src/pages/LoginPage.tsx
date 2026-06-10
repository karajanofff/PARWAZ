import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { RadioTower } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, token } = useAuth();
  const [email, setEmail] = useState("admin@mimo.uz");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError("Email yoki parol noto'g'ri");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-brand-600 p-3 text-white">
            <RadioTower size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold">MIMO 5G Monitoring</h1>
            <p className="text-sm text-slate-500">Tizimga kirish</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Parol</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? "Tekshirilmoqda..." : "Kirish"}</button>
        </form>
        <div className="mt-5 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
          Demo: admin@mimo.uz / Admin123! yoki operator@mimo.uz / Operator123!
        </div>
      </div>
    </main>
  );
}

