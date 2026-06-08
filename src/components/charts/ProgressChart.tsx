import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartPoint } from '../../types';

export function ProgressChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="h-72 rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-950">Progress chart</h3>
        <p className="text-sm text-slate-500">Aylar boyınsha orta ball ósiwi.</p>
      </div>
      <ResponsiveContainer width="100%" height="78%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="ballGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
          <Area type="monotone" dataKey="ball" stroke="#2563eb" strokeWidth={3} fill="url(#ballGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
