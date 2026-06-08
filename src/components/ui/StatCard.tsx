import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: 'blue' | 'cyan' | 'green' | 'amber' | 'rose' | 'indigo';
}

const toneMap = {
  blue: 'from-blue-500 to-cyan-400',
  cyan: 'from-cyan-500 to-teal-400',
  green: 'from-emerald-500 to-teal-400',
  amber: 'from-amber-400 to-orange-400',
  rose: 'from-rose-500 to-pink-400',
  indigo: 'from-indigo-500 to-blue-500',
};

export function StatCard({ title, value, detail, icon: Icon, tone = 'blue' }: StatCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-[1.35rem] border border-white/70 bg-white p-5 shadow-soft"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">{value}</h3>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${toneMap[tone]} p-3 text-white shadow-glow`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{detail}</p>
    </motion.article>
  );
}
