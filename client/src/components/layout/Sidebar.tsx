import { NavLink } from "react-router-dom";
import { Activity, AlarmClock, BarChart3, FileText, LayoutDashboard, Map, RadioTower, Settings, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/stations", label: "Stansiyalar", icon: RadioTower },
  { to: "/map", label: "Xarita", icon: Map },
  { to: "/kpis", label: "KPI monitoring", icon: Activity },
  { to: "/alarms", label: "Alarmlar", icon: AlarmClock },
  { to: "/configurations", label: "Konfiguratsiya", icon: Settings },
  { to: "/reports", label: "Hisobotlar", icon: FileText },
  { to: "/users", label: "Foydalanuvchilar", icon: Users, admin: true }
];

export function Sidebar() {
  const { isAdmin } = useAuth();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-950 lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="rounded-lg bg-brand-600 p-2 text-white">
          <BarChart3 size={24} />
        </div>
        <div>
          <p className="font-bold text-slate-950 dark:text-white">MIMO 5G</p>
          <p className="text-xs text-slate-500">Monitoring tizimi</p>
        </div>
      </div>
      <nav className="space-y-1">
        {items.filter((item) => !item.admin || isAdmin).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
