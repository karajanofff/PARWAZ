import { useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, CheckCircle2, FileText } from 'lucide-react';
import { CodeEditor } from '../components/code-editor/CodeEditor';
import { FeedbackBox } from '../components/assignment/FeedbackBox';
import { ResultTable } from '../components/assignment/ResultTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { assignments, aiFeedback } from '../data/mockData';
import { Language, TestCase } from '../types';
import { mockCheckCode } from '../utils/codeChecker';

const initialCode = `a, b = map(int, input().split())
print(max(a, b))`;

export function AssignmentDetail({ assignmentId, onBack, onResult }: { assignmentId: string; onBack: () => void; onResult: () => void }) {
  const assignment = useMemo(() => assignments.find((item) => item.id === assignmentId) ?? assignments[0], [assignmentId]);
  const [language, setLanguage] = useState<Language>(assignment.language);
  const [code, setCode] = useState(initialCode);
  const [cases, setCases] = useState<TestCase[]>(assignment.testCases.length ? assignment.testCases : assignments[0].testCases);
  const [score, setScore] = useState(67);

  const run = async () => {
    const token = localStorage.getItem('ai_tekseriw_token') ?? '';
    try {
      const response = await fetch('/api/check-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ assignmentId: assignment.id, code, testCases: cases }),
      });
      if (!response.ok) throw new Error('API qátesi');
      const result = (await response.json()) as { results: TestCase[]; score: number };
      setCases(result.results);
      setScore(result.score);
    } catch {
      const result = mockCheckCode(code, cases);
      setCases(result.cases);
      setScore(result.score);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-700">
            <ArrowLeft className="h-4 w-4" />
            Artqa
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={assignment.status} />
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{assignment.language}</span>
          </div>
          <h2 className="mt-3 text-3xl font-black text-slate-950">{assignment.title}</h2>
          <p className="mt-2 max-w-3xl text-slate-500">{assignment.description}</p>
        </div>
        <button onClick={onResult} className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white">Nátiyjeler</button>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-soft lg:col-span-2">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-950">Tapsırma shárti</h3>
          </div>
          <p className="mt-3 leading-7 text-slate-600">{assignment.description}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">Maksimal ball</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{assignment.maxScore}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">Házirgi ball</p>
              <p className="mt-1 text-2xl font-black text-indigo-600">{score}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500"><CalendarDays className="h-4 w-4" />Múddet</p>
              <p className="mt-1 text-lg font-black text-slate-950">{assignment.deadline}</p>
            </div>
          </div>
        </article>
        <article className="rounded-[1.35rem] border border-emerald-100 bg-emerald-50 p-5 shadow-soft">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          <h3 className="mt-4 text-lg font-bold text-slate-950">Avtomatik bahalaw</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Sistema kodtı test inputlar menen iske túsirip, outputtı expected output penen salıstıradı.</p>
        </article>
      </div>
      <CodeEditor code={code} language={language} onCodeChange={setCode} onLanguageChange={setLanguage} onRun={run} />
      <ResultTable cases={cases} />
      <FeedbackBox feedback={aiFeedback} />
    </div>
  );
}
