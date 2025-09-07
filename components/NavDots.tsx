import { useMemo } from "react";

export function NavDots({
  count,
  index,
  setIndex,
}: {
  count: number;
  index: number;
  setIndex: (n: number) => void;
}) {
  const ids = useMemo(
    () =>
      Array.from({ length: count }).map(
        () => Math.random().toString(36).slice(2, 9)
      ),
    [count]
  );

  return (
    <div className="fixed right-5 top-1/2 z-40 -translate-y-1/2 space-y-2">
      {ids.map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`Go to section ${i + 1}`}
          className={
            "block h-2.5 w-2.5 rounded-full transition-all " +
            (i === index
              ? "scale-125 bg-zinc-900 dark:bg-zinc-100"
              : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700")
          }
        />
      ))}
    </div>
  );
}