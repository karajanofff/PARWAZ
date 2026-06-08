import { ShieldCheck, GraduationCap, Presentation } from 'lucide-react';
import { Role } from '../../types';

const roleMap = {
  student: { label: 'Student', icon: GraduationCap, className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  teacher: { label: 'Oqıtıwshı', icon: Presentation, className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  admin: { label: 'Administrator', icon: ShieldCheck, className: 'bg-slate-100 text-slate-700 border-slate-200' },
} satisfies Record<Role, { label: string; icon: typeof ShieldCheck; className: string }>;

export function UserRoleBadge({ role }: { role: Role }) {
  const item = roleMap[role];
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${item.className}`}>
      <Icon className="h-4 w-4" />
      {item.label}
    </span>
  );
}
