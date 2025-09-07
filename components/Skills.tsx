import type { Cert, Skills as SkillsType } from "@/types";
import { Chip } from "./Chip";
import { Frame } from "./Frame";
import { Panel } from "./Panel";
import { Divider } from "./Divider";
import { Certifications } from "./Certifications";

export function Skills({
  skills,
  certs,
  title,
}: {
  skills: SkillsType;
  certs: Cert;
  title?: string;
}) {
  return (
    <Frame>
      <Panel
        title={title ?? "Skills & Tooling"}
        subtitle="Core and supporting domains"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <h3 className="text-base font-semibold">Primary</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.primary.map((s) => (
                <Chip key={s}>
                  {typeof s === "string" ? s : JSON.stringify(s)}
                </Chip>
              ))}
            </div>
          </div>
          <Divider orientation="vertical" />
          <div>
            <h3 className="text-base font-semibold">Secondary</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.secondary.map((s) => (
                <Chip key={s}>
                  {typeof s === "string" ? s : JSON.stringify(s)}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Panel>
      {certs.length > 0 && (
        <>
          <Divider hidden />
          <Certifications certs={certs} />
        </>
      )}
    </Frame>
  );
}
