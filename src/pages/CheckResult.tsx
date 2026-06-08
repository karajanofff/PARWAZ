import { RotateCcw } from 'lucide-react';
import { FeedbackBox } from '../components/assignment/FeedbackBox';
import { ResultTable } from '../components/assignment/ResultTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { aiFeedback, assignments } from '../data/mockData';

export function CheckResult({ onRetry }: { onRetry: () => void }) {
  const assignment = assignments[0];
  const passed = assignment.testCases.filter((item) => item.passed).length;
  const score = Math.round((passed / assignment.testCases.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <StatusBadge status="revision" />
          <h2 className="mt-3 text-3xl font-black text-slate-950">Kod tekseriw nátiyjesi</h2>
          <p className="mt-2 text-slate-500">Test keysler, ball, sintaksis qáteleri, logikalıq qáteler hám AI usınısı.</p>
        </div>
        <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white">
          <RotateCcw className="h-5 w-5" />
          Qayta tapsırıw
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-slate-500">Ball</p>
          <p className="mt-2 text-4xl font-black text-indigo-600">{score}%</p>
        </div>
        <div className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-slate-500">Durıs testler</p>
          <p className="mt-2 text-4xl font-black text-emerald-600">{passed}/{assignment.testCases.length}</p>
        </div>
        <div className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-slate-500">Bahalaw</p>
          <p className="mt-2 text-2xl font-black text-amber-600">Qayta islew kerek</p>
        </div>
      </div>
      <ResultTable cases={assignment.testCases} />
      <FeedbackBox feedback={aiFeedback} />
    </div>
  );
}
