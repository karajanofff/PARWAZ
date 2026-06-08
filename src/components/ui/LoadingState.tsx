export function LoadingState({ text = 'Júklenip atır' }: { text?: string }) {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-[1.35rem] border border-slate-200 bg-white">
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
        <span className="h-3 w-3 animate-ping rounded-full bg-cyan-500" />
        {text}
      </div>
    </div>
  );
}
