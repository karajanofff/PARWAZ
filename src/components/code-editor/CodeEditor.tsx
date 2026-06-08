import { Clipboard, FileUp, Play } from 'lucide-react';
import { Language } from '../../types';

interface CodeEditorProps {
  code: string;
  language: Language;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: Language) => void;
  onRun: () => void;
}

export function CodeEditor({ code, language, onCodeChange, onLanguageChange, onRun }: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-slate-950 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Clipboard className="h-4 w-4 text-cyan-300" />
          Kod editor
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as Language)}
            className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white outline-none"
          >
            <option className="text-slate-900">Python</option>
            <option className="text-slate-900">JavaScript</option>
            <option className="text-slate-900">C++</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15">
            <FileUp className="h-4 w-4" />
            Fayl júklew
          </button>
          <button
            onClick={onRun}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-glow hover:from-cyan-400 hover:to-indigo-500"
          >
            <Play className="h-4 w-4" />
            Kodtı tekseriw
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(event) => onCodeChange(event.target.value)}
        spellCheck={false}
        className="code-scroll min-h-[360px] w-full resize-y bg-slate-950 p-5 font-mono text-sm leading-7 text-cyan-50 outline-none"
      />
    </div>
  );
}
