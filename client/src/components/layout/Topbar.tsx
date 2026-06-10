import { Bell, LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function Topbar() {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(localStorage.getItem("mimo_theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("mimo_theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-950 dark:text-white">MIMO asosidagi 5G antenna tizimi monitoringi</h1>
          <p className="text-xs text-slate-500">Diplom loyiha boshqaruv muhiti</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary px-3" title="Bildirishnomalar">
            <Bell size={18} />
          </button>
          <button className="btn-secondary px-3" onClick={() => setDark((value) => !value)} title="Rang rejimi">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold dark:text-white">{user?.fullName}</p>
            <p className="text-xs text-slate-500">{user?.role === "ADMIN" ? "Administrator" : "Operator"}</p>
          </div>
          <button className="btn-secondary px-3" onClick={logout} title="Chiqish">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

