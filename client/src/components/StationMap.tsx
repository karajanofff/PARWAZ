import { MapPin } from "lucide-react";

export function StationMap({ latitude, longitude, name }: { latitude: number; longitude: number; name: string }) {
  return (
    <div className="relative h-64 overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#e7f5ff_0%,#f8fafc_45%,#dcfce7_100%)] dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)", backgroundSize: "26px 26px" }} />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-brand-700">
        <div className="rounded-full bg-white p-3 shadow-soft dark:bg-slate-950">
          <MapPin size={26} />
        </div>
        <div className="mt-3 rounded-md bg-white px-3 py-2 text-center text-sm font-semibold shadow-soft dark:bg-slate-950 dark:text-white">
          {name}
          <div className="text-xs font-normal text-slate-500">{latitude.toFixed(4)}, {longitude.toFixed(4)}</div>
        </div>
      </div>
    </div>
  );
}

