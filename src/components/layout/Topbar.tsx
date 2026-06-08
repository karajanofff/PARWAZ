import { Bell, LogOut, Menu, Search } from 'lucide-react';
import { Role, User } from '../../types';
import { UserRoleBadge } from '../ui/UserRoleBadge';

interface TopbarProps {
  user: User;
  role: Role;
  onMenu: () => void;
  onLogout: () => void;
}

export function Topbar({ user, role, onMenu, onLogout }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 px-4 py-3 backdrop-blur-xl lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden" aria-label="Menyudi ashıw">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-500 md:flex">
            <Search className="h-4 w-4" />
            <span className="text-sm">Tapsırma, student yamasa esabat izlew</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600" aria-label="Bildiriwler">
            <Bell className="h-5 w-5" />
          </button>
          <UserRoleBadge role={role} />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <button onClick={onLogout} className="rounded-xl bg-slate-950 p-2 text-white" aria-label="Shıǵıw">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
