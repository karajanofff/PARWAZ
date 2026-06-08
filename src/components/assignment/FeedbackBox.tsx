import { BrainCircuit, Lightbulb, Route, ScanLine } from 'lucide-react';
import { AiFeedback } from '../../types';

export function FeedbackBox({ feedback }: { feedback: AiFeedback }) {
  const items = [
    { title: 'Sintaksis qáteleri', text: feedback.syntax, icon: ScanLine },
    { title: 'Logikalıq qáteler', text: feedback.logic, icon: BrainCircuit },
    { title: 'Algoritm talqılawı', text: feedback.algorithm, icon: Route },
    { title: 'AI usınısı', text: feedback.suggestion, icon: Lightbulb },
  ];

  return (
    <section className="rounded-[1.35rem] border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-3 text-white">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-950">AI túsindirmesi</h3>
          <p className="text-sm text-slate-500">Mock AI feedback servisi keyin OpenAI API menen almastırıwǵa tayar.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-white bg-white/85 p-4">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Icon className="h-4 w-4 text-indigo-600" />
                {item.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
