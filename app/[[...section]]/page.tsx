// biome-ignore assist/source/organizeImports: <Not Needed>
import type { Metadata } from "next";
import type { PageConfig } from "@/components/PageConfig";
import ClientDeck from "@/components/ClientDeck";
import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
export const runtime = "nodejs";

type PortfolioData = {
  metadata?: {
    title?: string;
    description?: string;
  };
  pages: PageConfig[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

async function getPortfolioData(): Promise<PortfolioData> {
  const file = await fs.readFile(
    path.join(process.cwd(), "content/portfolio.yaml"),
    "utf8",
  );
  return YAML.parse(file);
}

function uniqueSlugs(pages: PageConfig[]) {
  const base = pages.map((p, i) => slugify(String(p.title ?? i)));
  const seen = new Map<string, number>();
  return base.map((s) => {
    const n = (seen.get(s) ?? 0) + 1;
    seen.set(s, n);
    return n === 1 ? s : `${s}-${n}`;
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();

  return {
    title: data.metadata?.title ?? "Portfolio",
    description: data.metadata?.description ?? "My portfolio",
    openGraph: {
      title: data.metadata?.title ?? "Portfolio",
      description: data.metadata?.description ?? "My portfolio",
    },
  };
}

export async function generateStaticParams() {
  const data = await getPortfolioData();
  const slugs = uniqueSlugs(data.pages);

  return [{ section: [] }, ...slugs.map((s) => ({ section: [s] }))];
}

export default async function Page() {
  const data = await getPortfolioData();
  return <ClientDeck pages={data.pages} />;
}
