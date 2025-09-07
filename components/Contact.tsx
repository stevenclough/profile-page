import type { Profile } from "@/types";
import { Frame } from "./Frame";
import { Panel } from "./Panel";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <Frame>
      <Panel title="Contact">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Open to senior infrastructure roles, consulting, and event networking.
        </p>
        <div className="mt-4 flex gap-3">
          <a
            href={profile.email}
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm"
          >
            LinkedIn
          </a>
        </div>
      </Panel>
    </Frame>
  );
}