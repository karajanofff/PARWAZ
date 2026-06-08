import { FileSearch } from 'lucide-react';

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.35rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center">
      <FileSearch className="mx-auto h-10 w-10 text-slate-400" />
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{text}</p>
    </div>
  );
}
