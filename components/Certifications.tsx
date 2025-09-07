import type { Cert } from "@/types";
import { Panel } from "./Panel";
import { Frame } from "./Frame";

export function Certifications({
  certs,
  title,
}: {
  certs: Cert;
  title?: string;
}) {
  const content = (
    <Panel title={title ?? "Certifications"}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {certs.map((c) => (
          <li key={c.name} className="rounded-lg border p-3 text-sm">
            <p className="font-medium">{c.name}</p>
            <p className="opacity-70">{c.dates}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
  if (title) {
    return <Frame>{content}</Frame>;
  }
  return content;
}
