import { BarChart3, BookOpenCheck, CheckSquare2, UsersRound } from 'lucide-react';
import { ErrorChart } from '../components/charts/ErrorChart';
import { ProgressChart } from '../components/charts/ProgressChart';
import { StatusBadge } from '../components/ui/StatusBadge';
import { StatCard } from '../components/ui/StatCard';
import { assignments, errorStats, progressData, studentRanking, submissions } from '../data/mockData';

export function TeacherDashboard({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-950">Oqıtıwshı paneli</h2>
          <p className="mt-2 text-slate-500">Tapsırmalar jaratıw, test keys qosıw hám studentlerdiń jumısların baqlaw.</p>
        </div>
        <button onClick={onCreate} className="rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 font-bold text-white shadow-glow">Tapsırma jaratıw</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Jami studentler" value="128" detail="4 guruh boyınsha" icon={UsersRound} tone="blue" />
        <StatCard title="Jami tapsırmalar" value={String(assignments.length)} detail="Aktiv praktikumlar" icon={BookOpenCheck} tone="indigo" />
        <StatCard title="Tekserilgen jumıslar" value="342" detail="Avtomatik bahalaw" icon={CheckSquare2} tone="green" />
        <StatCard title="Orta nátiyje" value="82%" detail="Sońǵı 30 kún" icon={BarChart3} tone="cyan" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ErrorChart data={errorStats} />
        <ProgressChart data={progressData} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <section className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-lg font-bold text-slate-950">Júklengen jumıslar</h3>
          <div className="thin-scroll mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3">Student</th>
                  <th className="py-3">Ball</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Waqıt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 font-bold text-slate-900">{item.studentName}</td>
                    <td className="py-4 text-indigo-600 font-black">{item.score}%</td>
                    <td className="py-4"><StatusBadge status={item.status} /></td>
                    <td className="py-4 text-slate-500">{item.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-lg font-bold text-slate-950">Studentler reytingi</h3>
          <div className="mt-4 space-y-4">
            {studentRanking.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>{item.name}</span>
                  <span>{item.ball}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600" style={{ width: `${item.ball}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
