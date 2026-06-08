import { CheckCircle2, Clock3, RotateCcw, XCircle } from 'lucide-react';
import { Status } from '../../types';

const statusMap = {
  submitted: { label: 'Tapsırıldı', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  revision: { label: 'Qayta islew kerek', className: 'bg-amber-50 text-amber-700 border-amber-200', icon: RotateCcw },
  error: { label: 'Qáte', className: 'bg-rose-50 text-rose-700 border-rose-200', icon: XCircle },
  checking: { label: 'Tekserilmekte', className: 'bg-sky-50 text-sky-700 border-sky-200', icon: Clock3 },
} satisfies Record<Status, { label: string; className: string; icon: typeof CheckCircle2 }>;

export function StatusBadge({ status }: { status: Status }) {
  const item = statusMap[status];
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${item.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  );
}
