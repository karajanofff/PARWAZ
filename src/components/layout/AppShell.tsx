import { ReactNode, useState } from 'react';
import { Role, User } from '../../types';
import { Sidebar, ViewKey } from './Sidebar';
import { Topbar } from './Topbar';

interface AppShellProps {
  user: User;
  role: Role;
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  onLogout: () => void;
  children: ReactNode;
}

export function AppShell({ user, role, activeView, onNavigate, onLogout, children }: AppShellProps) {
  const [open, setOpen] = useState(false);

  const navigate = (view: ViewKey) => {
    onNavigate(view);
    setOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Sidebar role={role} activeView={activeView} onNavigate={navigate} open={open} />
      {open && <button className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={() => setOpen(false)} aria-label="Menyudi jabıw" />}
      <div className="lg:pl-72">
        <Topbar user={user} role={role} onMenu={() => setOpen(true)} onLogout={onLogout} />
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
