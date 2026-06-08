import { BarChart3, BookOpenCheck, BrainCircuit, FilePlus2, GraduationCap, Home, ShieldCheck, UsersRound } from 'lucide-react';
import { Role } from '../../types';

export type ViewKey = 'landing' | 'login' | 'student' | 'teacher' | 'admin' | 'assignment' | 'create' | 'result';

interface SidebarProps {
  role: Role;
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  open: boolean;
}

export function Sidebar({ role, activeView, onNavigate, open }: SidebarProps) {
  const common = [
    { key: role, label: role === 'student' ? 'Student kabineti' : role === 'teacher' ? 'Oqıtıwshı paneli' : 'Admin panel', icon: Home },
    { key: 'assignment', label: 'Ámeliy tapsırmalar', icon: BookOpenCheck },
    { key: 'result', label: 'Nátiyjeler', icon: BarChart3 },
  ] as const;

  const teacherItems = [{ key: 'create', label: 'Tapsırma jaratıw', icon: FilePlus2 }] as const;
  const adminItems = [
    { key: 'admin', label: 'Paydalanıwshılar', icon: UsersRound },
    { key: 'admin', label: 'Rollar', icon: ShieldCheck },
  ] as const;

  const items = role === 'teacher' ? [...common, ...teacherItems] : role === 'admin' ? [...common, ...adminItems] : common;

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/70 bg-white/90 p-5 shadow-soft backdrop-blur-xl transition lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-3 text-white shadow-glow">
          <BrainCircuit className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-950">AI Tekseriw</h1>
          <p className="text-xs font-semibold text-slate-500">Joqarı oqıw platforması</p>
        </div>
      </div>
      <nav className="mt-8 space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === item.key;
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => onNavigate(item.key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${isActive ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-glow' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] bg-slate-950 p-4 text-white">
        <GraduationCap className="h-7 w-7 text-cyan-300" />
        <p className="mt-3 text-sm font-bold">AI járdeminde bahalaw</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">Sintaksis, logika hám algoritm qáteleri túsinikli kórsetiledi.</p>
      </div>
    </aside>
  );
}
