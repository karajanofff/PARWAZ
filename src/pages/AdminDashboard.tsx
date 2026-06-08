import { Database, Layers3, ShieldCheck, UsersRound } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { users } from '../data/mockData';
import { UserRoleBadge } from '../components/ui/UserRoleBadge';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-slate-950">Admin panel</h2>
        <p className="mt-2 text-slate-500">Paydalanıwshılar, pánler, guruhlar, rollar hám sistema statistikası.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Paydalanıwshılar" value="486" detail="Aktiv akkauntlar" icon={UsersRound} tone="blue" />
        <StatCard title="Pánler" value="18" detail="Programmalastırıw baǵdarı" icon={Layers3} tone="cyan" />
        <StatCard title="Guruhlar" value="24" detail="Oqıw toparları" icon={Database} tone="indigo" />
        <StatCard title="Rollar" value="3" detail="Student, oqıtıwshı, admin" icon={ShieldCheck} tone="green" />
      </div>
      <section className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
        <h3 className="text-lg font-bold text-slate-950">Paydalanıwshılar</h3>
        <div className="mt-4 grid gap-3">
          {users.map((user) => (
            <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="font-bold text-slate-950">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              <UserRoleBadge role={user.role} />
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-5 md:grid-cols-3">
        {['users', 'roles', 'groups', 'subjects', 'assignments', 'test_cases', 'submissions', 'submission_results', 'ai_feedback', 'grades', 'notifications'].map((table) => (
          <div key={table} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-500">Keste</p>
            <h4 className="mt-1 text-lg font-black text-slate-950">{table}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
