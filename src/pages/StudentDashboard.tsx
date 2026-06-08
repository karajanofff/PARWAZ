import { Award, BookOpenCheck, BrainCircuit, TrendingUp } from 'lucide-react';
import { AssignmentCard } from '../components/assignment/AssignmentCard';
import { ProgressChart } from '../components/charts/ProgressChart';
import { StatCard } from '../components/ui/StatCard';
import { assignments, progressData, submissions } from '../data/mockData';

export function StudentDashboard({ onOpenAssignment, onOpenResult }: { onOpenAssignment: (id: string) => void; onOpenResult: () => void }) {
  const completed = assignments.filter((item) => item.status === 'submitted').length;
  const average = Math.round(assignments.reduce((sum, item) => sum + (item.score ?? 72), 0) / assignments.length);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-slate-950">Student kabineti</h2>
        <p className="mt-2 text-slate-500">Ámeliy tapsırmalar, bahalar, AI pikirleri hám sońǵı nátiyjeler.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Jami tapsırmalar" value={String(assignments.length)} detail="Belgilengen pánler boyınsha" icon={BookOpenCheck} tone="blue" />
        <StatCard title="Tapsırılǵan jumıslar" value={String(completed)} detail="Avtomatik tekseriwden ótti" icon={Award} tone="green" />
        <StatCard title="Orta ball" value={`${average}%`} detail="May ayı ushın progress" icon={TrendingUp} tone="cyan" />
        <StatCard title="AI usınısları" value="12" detail="Qayta islew ushın pikirler" icon={BrainCircuit} tone="indigo" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <ProgressChart data={progressData} />
        <div className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-lg font-bold text-slate-950">Sońǵı nátiyjeler</h3>
          <div className="mt-4 space-y-3">
            {submissions.slice(0, 4).map((item) => (
              <button key={item.id} onClick={onOpenResult} className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left hover:bg-cyan-50">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-slate-900">{item.studentName}</span>
                  <span className="font-black text-indigo-600">{item.score}%</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.aiSummary}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-950">Ámeliy tapsırmalar dizimi</h3>
          <button onClick={() => onOpenAssignment('a1')} className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">Kodtı tekseriw</button>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} onOpen={onOpenAssignment} />
          ))}
        </div>
      </section>
    </div>
  );
}
