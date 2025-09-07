import type { Experience as ExperienceType } from "@/types";
import { Frame } from "./Frame";
import { Panel } from "./Panel";

export function Experience({
  experience,
  title,
}: {
  experience: ExperienceType;
  title?: string;
}) {
  return (
    <Frame>
      <Panel
        title={title ?? "Experience & Volunteering"}
        subtitle="Condensed highlights"
      >
        {experience.map((org) => (
          <div key={org.company} className="space-y-2">
            <h3 className="text-base font-semibold">{org.company}</h3>
            <ul className="space-y-2">
              {org.items.map((r) => (
                <li key={r.title + r.dates} className="rounded-lg border p-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{r.title}</span>
                    <span className="opacity-70">{r.dates}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {r.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Panel>
    </Frame>
  );
}
