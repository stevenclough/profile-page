import type { Profile } from "@/types";
import { Frame } from "./Frame";
import { Stat } from "./Stat";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <Frame>
      <div className="flex flex-col items-center gap-8 text-center">
        <div
          role="img"
          aria-label={`Portrait of ${profile.name}`}
          style={{ backgroundImage: `url(${profile.photo})` }}
          className="w-40 h-40 rounded-2xl shadow-lg bg-cover bg-center ring-1 ring-black/10"
        />
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="text-lg opacity-90">
            {profile.role} · {profile.location}
          </p>
          <p className="mx-auto max-w-3xl text-balance text-zinc-600 dark:text-zinc-400">
            {profile.summary}
          </p>
        </div>
        {profile.stats && profile.stats.length > 0 && (
          <div
            className="grid gap-3 justify-center items-center text-center"
            style={{
              gridTemplateColumns: `repeat(${profile.stats.length}, minmax(0, 1fr))`,
            }}
          >
            {profile.stats.map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-stretch justify-center gap-3 pt-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[120px] min-h-[48px] flex items-center justify-center text-center rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm"
          >
            View LinkedIn
          </a>
          <a
            href={profile.email}
            className="flex-1 min-w-[120px] min-h-[48px] flex items-center justify-center text-center rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </Frame>
  );
}
