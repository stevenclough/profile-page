export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border p-4 text-center">
      <div
        className="text-2xl font-bold tracking-tight"
        style={{ whiteSpace: "pre-line" }}
      >
        {value}
      </div>
      <div className="text-xs text-zinc-600 dark:text-zinc-400">{label}</div>
    </div>
  );
}
