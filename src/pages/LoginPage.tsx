import { FormEvent, useState } from 'react';
import { BookOpenCheck, BrainCircuit, LockKeyhole, Mail } from 'lucide-react';
import { Role, User } from '../types';
import { login } from '../services/authService';

export function LoginPage({ onLogin }: { onLogin: (user: User, role: Role) => void }) {
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('paydalaniwshi@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const user = await login(email, role);
    setLoading(false);
    onLogin(user, role);
  };

  const setRoleAndEmail = (nextRole: Role) => {
    setRole(nextRole);
    setEmail(nextRole === 'student' ? 'paydalaniwshi@gmail.com' : nextRole === 'teacher' ? 'oqitiwshi@gmail.com' : 'admin@gmail.com');
  };

  return (
    <div className="grid min-h-screen items-center gap-8 px-4 py-8 lg:grid-cols-[1fr_0.95fr] lg:px-12">
      <section className="mx-auto w-full max-w-xl rounded-[2rem] border border-white bg-white/90 p-6 shadow-glow md:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-3 text-white">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-950">Kiris</h1>
            <p className="text-sm text-slate-500">Dizimnen ótiw hám platformaǵa kiriw</p>
          </div>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Email</span>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Mail className="h-5 w-5 text-slate-400" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent outline-none" />
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Parol</span>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <LockKeyhole className="h-5 w-5 text-slate-400" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full bg-transparent outline-none" />
            </div>
          </label>
          <div>
            <span className="text-sm font-bold text-slate-700">Rol tańlaw</span>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {(['student', 'teacher', 'admin'] as Role[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setRoleAndEmail(item)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-bold ${role === item ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600'}`}
                >
                  {item === 'student' ? 'Student' : item === 'teacher' ? 'Oqıtıwshı' : 'Administrator'}
                </button>
              ))}
            </div>
          </div>
          <button disabled={loading || !password} className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-4 font-black text-white shadow-glow disabled:opacity-60">
            {loading ? 'Tekserilmekte' : 'Platformaǵa kiriw'}
          </button>
        </form>
      </section>
      <section className="hidden lg:block">
        <div className="rounded-[2.3rem] border border-white bg-white/70 p-8 shadow-glow">
          <div className="rounded-[1.8rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-900 p-8 text-white">
            <BookOpenCheck className="h-14 w-14 text-cyan-300" />
            <h2 className="mt-8 text-4xl font-black leading-tight">Bilimlendiriw ushın aqıllı kod bahalaw ortalıǵı</h2>
            <p className="mt-5 text-lg leading-8 text-cyan-50/80">Tapsırma, test keys, avtomatik ball, AI túsindirmesi hám esabatlar bir jerde.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {['JWT auth', 'Role-based access', 'PostgreSQL tayar', 'Mock AI service'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 font-bold">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
