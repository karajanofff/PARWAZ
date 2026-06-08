import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#2563eb', '#06b6d4', '#f59e0b', '#ef4444'];

export function ErrorChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-72 rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-lg font-bold text-slate-950">Qáte túrleri statistikası</h3>
      <p className="text-sm text-slate-500">Avtomatik tekseriwde eń kóp ushırasqan qáteler.</p>
      <ResponsiveContainer width="100%" height="78%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={82} innerRadius={48} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
