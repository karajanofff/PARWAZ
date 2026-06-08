import { Save, PlusCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function CreateAssignment({ onSaved }: { onSaved: () => void }) {
  const [saved, setSaved] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(onSaved, 700);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-slate-950">Tapsırma jaratıw</h2>
        <p className="mt-2 text-slate-500">Tapsırma shárti, programmalastırıw tili, test input hám kútilgen output qosıń.</p>
      </div>
      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <section className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="grid gap-5">
            <label>
              <span className="text-sm font-bold text-slate-700">Tapsırma atı</span>
              <input defaultValue="Eki sannıń úlkenin tabıw" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400" />
            </label>
            <label>
              <span className="text-sm font-bold text-slate-700">Tapsırma shárti</span>
              <textarea defaultValue="Eki pútin san berilgen. Úlken sanı shıǵarıń." className="mt-2 min-h-36 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400" />
            </label>
            <div className="grid gap-5 md:grid-cols-3">
              <label>
                <span className="text-sm font-bold text-slate-700">Programmalastırıw tili</span>
                <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
                  <option>Python</option>
                  <option>JavaScript</option>
                  <option>C++</option>
                </select>
              </label>
              <label>
                <span className="text-sm font-bold text-slate-700">Maksimal ball</span>
                <input defaultValue="100" type="number" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
              </label>
              <label>
                <span className="text-sm font-bold text-slate-700">Múddet</span>
                <input defaultValue="2026-05-24" type="date" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
              </label>
            </div>
          </div>
        </section>
        <section className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-950">Test keys qosıw</h3>
            <button type="button" className="rounded-xl border border-slate-200 p-2 text-slate-700" aria-label="Test qosıw">
              <PlusCircle className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-5 space-y-4">
            {[
              ['5 8', '8'],
              ['12 3', '12'],
              ['-4 -9', '-4'],
            ].map(([input, output], index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label className="block">
                  <span className="text-xs font-bold uppercase text-slate-500">Test input</span>
                  <input defaultValue={input} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono outline-none" />
                </label>
                <label className="mt-3 block">
                  <span className="text-xs font-bold uppercase text-slate-500">Kútilgen output</span>
                  <input defaultValue={output} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono outline-none" />
                </label>
              </div>
            ))}
          </div>
          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-4 font-black text-white shadow-glow">
            <Save className="h-5 w-5" />
            {saved ? 'Saqlandı' : 'Saqlaw'}
          </button>
        </section>
      </form>
    </div>
  );
}
