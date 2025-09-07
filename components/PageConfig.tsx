import type {
  Cert,
  Experience as ExperienceType,
  Profile,
  Skills as SkillsType,
} from "@/types";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Certifications } from "./Certifications";

export type SkillsData = {
  primary: string[];
  secondary?: string[];
};
export type ExperienceCompany = {
  company: string;
  items: Array<{
    title: string;
    dates?: string;
    summary?: string;
  }>;
};
export type ExperienceData = ExperienceCompany[];

export type PageConfig =
  | {
      title?: string;
      type: "hero";
      profile?: Profile;
    }
  | {
      title?: string;
      type: "skills";
      skills?: SkillsData | SkillsType;
      certs?: Cert;
    }
  | {
      title?: string;
      type: "experience";
      experience?: ExperienceData | ExperienceType;
    }
  | {
      title?: string;
      type: "certifications";
      certs?: Cert;
    };

export type GlobalFallbacks = {
  profile?: Profile;
  skills?: SkillsType;
  experience?: ExperienceType;
  certs?: Cert;
};

export function renderPage(cfg: PageConfig) {
  switch (cfg.type) {
    case "hero": {
      const profile = cfg.profile;
      if (!profile) return null;
      return <Hero profile={profile} />;
    }
    case "skills": {
      const skills = cfg.skills as SkillsType;
      const certs = cfg.certs;
      if (!skills) return null;
      return (
        <Skills
          skills={skills}
          certs={certs ?? ([] as unknown as Cert)}
          title={cfg.title}
        />
      );
    }
    case "experience": {
      const experience = cfg.experience as ExperienceType;
      if (!experience) return null;
      return <Experience experience={experience} title={cfg.title} />;
    }
    case "certifications": {
      const certs = cfg.certs;
      if (!certs) return null;
      return <Certifications certs={certs} title={cfg.title} />;
    }
    default:
      return null;
  }
}
