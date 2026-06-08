import { CheckCircle2, XCircle } from 'lucide-react';
import { TestCase } from '../../types';

export function ResultTable({ cases }: { cases: TestCase[] }) {
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-soft">
      <div className="border-b border-slate-200 p-5">
        <h3 className="text-lg font-bold text-slate-950">Test keysler jadvali</h3>
        <p className="mt-1 text-sm text-slate-500">Kútilgen output hám student outputı salıstırıldı.</p>
      </div>
      <div className="thin-scroll overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Input</th>
              <th className="px-5 py-3">Kútilgen output</th>
              <th className="px-5 py-3">Student outputı</th>
              <th className="px-5 py-3">Waqıt</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-4 font-mono text-slate-900">{item.input}</td>
                <td className="px-5 py-4 font-mono text-slate-700">{item.expectedOutput}</td>
                <td className="px-5 py-4 font-mono text-slate-700">{item.actualOutput ?? '-'}</td>
                <td className="px-5 py-4 text-slate-500">{item.timeMs ?? 0} ms</td>
                <td className="px-5 py-4">
                  {item.passed ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Durıs
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 font-semibold text-rose-700">
                      <XCircle className="h-4 w-4" />
                      Qáte
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
