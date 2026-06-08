import { ArrowRight, CalendarDays, Code2, Layers3 } from 'lucide-react';
import { Assignment } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';

interface AssignmentCardProps {
  assignment: Assignment;
  onOpen: (id: string) => void;
}

export function AssignmentCard({ assignment, onOpen }: AssignmentCardProps) {
  return (
    <article className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={assignment.status} />
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{assignment.difficulty}</span>
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-950">{assignment.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{assignment.description}</p>
        </div>
        <button
          onClick={() => onOpen(assignment.id)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-indigo-700"
          aria-label="Tapsırmanı ashıw"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
        <span className="flex items-center gap-2"><Layers3 className="h-4 w-4 text-cyan-600" />{assignment.subject}</span>
        <span className="flex items-center gap-2"><Code2 className="h-4 w-4 text-indigo-600" />{assignment.language}</span>
        <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-amber-600" />{assignment.deadline}</span>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Bahalaw</span>
          <span>{assignment.score ?? 0}/{assignment.maxScore}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600" style={{ width: `${assignment.score ?? 18}%` }} />
        </div>
      </div>
    </article>
  );
}
