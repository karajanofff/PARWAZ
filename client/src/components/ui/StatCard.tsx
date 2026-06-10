import { LucideIcon } from "lucide-react";

export function StatCard({ title, value, hint, icon: Icon }: { title: string; value: string | number; hint?: string; icon: LucideIcon }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
        </div>
        <div className="rounded-lg bg-brand-50 p-3 text-brand-600 dark:bg-slate-800 dark:text-brand-100">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

