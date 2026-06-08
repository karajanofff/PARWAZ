import { ArrowRight, BrainCircuit, CheckCircle2, Code2, GraduationCap, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  const features = [
    'Test keysler menen avtomatik tekseriw',
    'AI túsindirmesi hám anıq usınıslar',
    'Oqıtıwshı ushın diagrammalı esabatlar',
  ];

  const roles = [
    { title: 'Student', text: 'Kod jazadı, fayl júkleydi, ball hám AI pikirlerin kóredi.', icon: GraduationCap },
    { title: 'Oqıtıwshı', text: 'Tapsırma jaratadı, test keys qosadı, nátiyjelerdi baqlaydı.', icon: Code2 },
    { title: 'Administrator', text: 'Paydalanıwshılar, pánler, guruhlar hám rollardı basqaradı.', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-3 text-white shadow-glow">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <span className="text-lg font-black text-slate-950">AI Tekseriw Platforması</span>
        </div>
        <button onClick={onLogin} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-soft">
          Platformaǵa kiriw
          <ArrowRight className="h-4 w-4" />
        </button>
      </header>
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-4 pb-12 pt-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-bold text-cyan-700 shadow-soft">
              <Sparkles className="h-4 w-4" />
              Premium LMS · AI bahalaw · REST API tayar
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-6xl">
              AI járdeminde ámeliy jumıslardı tekseriw platforması
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Student kodın test keysler arqalı avtomatik tekserip, ball shıǵaradı hám qátelerdi túsinikli AI pikirleri menen kórsetedi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onLogin} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-4 font-bold text-white shadow-glow">
                Platformaǵa kiriw
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 shadow-soft">Artıqmashılıqlar</button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/85 p-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 flex-none text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="relative">
            <div className="rounded-[2rem] border border-white bg-white p-5 shadow-glow">
              <div className="rounded-[1.6rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-cyan-200">Kodtı tekseriw processi</span>
                  <Code2 className="h-5 w-5" />
                </div>
                <pre className="code-scroll mt-5 overflow-auto rounded-2xl bg-white/10 p-4 text-sm leading-7 text-cyan-50">{`a, b = map(int, input().split())
print(max(a, b))`}</pre>
                <div className="mt-5 grid gap-3">
                  {['Kod yamasa fayl qabıl etiledi', 'Test inputlar iske túsedi', 'Output salıstırıladı', 'AI túsindirmesi beriledi'].map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-slate-950">{index + 1}</span>
                      <span className="text-sm font-semibold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <article key={role.title} className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-soft">
                  <Icon className="h-8 w-8 text-indigo-600" />
                  <h3 className="mt-4 text-xl font-bold text-slate-950">{role.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{role.text}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
