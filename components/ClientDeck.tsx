"use client";
// biome-ignore assist/source/organizeImports: <Not Needed>
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavDots } from "./NavDots";
import type { PageConfig } from "./PageConfig";
import { renderPage } from "./PageConfig";
import { usePathname, useRouter, useParams } from "next/navigation";

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const variants = {
  enter: (direction: number) => ({ y: direction > 0 ? 96 : -96, opacity: 0 }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -96 : 96,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.42, 0, 1, 1] as const },
  }),
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function useDeck(length: number, initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const cooldownRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(clamp(next, 0, length - 1));
    },
    [index, length],
  );

  const step = useCallback(
    (delta: number) => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      go(clamp(index + (delta > 0 ? 1 : -1), 0, length - 1));
      setTimeout(() => {
        cooldownRef.current = false;
      }, 600);
    },
    [go, index, length],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY === 0) return;
      step(e.deltaY);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartY.current = t.clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current == null) return;
      const t = e.changedTouches[0];
      const dy = t.clientY - touchStartY.current;
      if (Math.abs(dy) > 30) step(-dy);
      touchStartY.current = null;
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("wheel", onWheel as EventListener);
      document.removeEventListener("keydown", onKey as EventListener);
      document.removeEventListener("touchstart", onTouchStart as EventListener);
      document.removeEventListener("touchend", onTouchEnd as EventListener);
      document.body.style.overflow = original;
    };
  }, [go, index, step]);

  return { index, setIndex: go, direction } as const;
}

export default function ClientDeck({ pages }: { pages: PageConfig[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ section?: string[] }>();

  const sections = useMemo(
    () =>
      pages.map((cfg, i) => (
        <div key={`${cfg.type}-${cfg.title ?? i}`} className="h-full">
          {renderPage(cfg)}
        </div>
      )),
    [pages],
  );

  const slugs = useMemo(() => {
    const base = pages.map((p, i) => slugify(String(p.title ?? i)));
    const seen = new Map<string, number>();
    return base.map((s) => {
      const n = (seen.get(s) ?? 0) + 1;
      seen.set(s, n);
      return n === 1 ? s : `${s}-${n}`;
    });
  }, [pages]);

  const urlSlug = params.section?.at(-1) ?? null;

  const computedInitialIndex = useMemo(() => {
    if (!urlSlug) return 0;
    const idx = slugs.indexOf(urlSlug);
    return idx === -1 ? 0 : idx;
  }, [urlSlug, slugs]);

  const { index, setIndex, direction } = useDeck(sections.length, computedInitialIndex);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Not Needed>
  useEffect(() => {
    const idx = urlSlug ? slugs.indexOf(urlSlug) : 0;
    if (idx !== -1 && idx !== index) setIndex(idx);
  }, [urlSlug, slugs]);

  useEffect(() => {
    const segments = (pathname ?? "").split("/").filter(Boolean);
    const sectionLen = params.section?.length ?? 0;
    const baseSegments = segments.slice(0, segments.length - sectionLen);
    const nextPath = "/" + [...baseSegments, slugs[index]].join("/");

    if (typeof window !== "undefined") {
      const search = window.location.search || "";
      const hash = window.location.hash || "";
      const full = nextPath + search + hash;
      const current = window.location.pathname + search + hash;
      if (current !== full) router.replace(full, { scroll: false });
    }
  }, [index, slugs, pathname, params.section, router]);

  return (
    <main
      className="relative h-svh w-full overflow-hidden text-zinc-900 dark:text-zinc-100
                 bg-gradient-to-br from-zinc-50 via-white to-zinc-50
                 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0
                   [mask-image:radial-gradient(black,transparent_70%)]"
      >
        <div
          className="h-full w-full
                     bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
                     bg-[size:24px_24px]
                     dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
        />
      </div>

      <div className="absolute inset-0 z-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-full"
          >
            {sections[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <NavDots count={sections.length} index={index} setIndex={setIndex} />
      <div className="pointer-events-none fixed bottom-3 left-1/2 z-20 -translate-x-1/2 text-xs text-zinc-500 dark:text-zinc-400">
        Swipe / Scroll up & down • Keyboard: ↑ ↓ PgUp PgDn
      </div>
    </main>
  );
}
