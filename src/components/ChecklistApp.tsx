"use client";

import { useEffect, useMemo, useState } from "react";
import { ROADMAP, TOTAL_ITEMS } from "@/data/roadmap";
import { useProgress } from "@/hooks/useProgress";
import type { Lang } from "@/lib/youtube";
import ProgressBar from "./ProgressBar";
import SectionCard from "./SectionCard";

type Filter = "all" | "todo" | "done";

export default function ChecklistApp() {
  const { done, loaded, toggle, setMany, reset } = useProgress();
  const [filter, setFilter] = useState<Filter>("all");
  const [lang, setLang] = useState<Lang>("id");

  // Muat preferensi bahasa.
  useEffect(() => {
    const saved = localStorage.getItem("lt-lang");
    if (saved === "en" || saved === "id") setLang(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("lt-lang", lang);
  }, [lang]);

  const completedCount = useMemo(
    () => Object.values(done).filter(Boolean).length,
    [done],
  );

  // Hindari hydration mismatch: tampilkan skeleton sampai localStorage termuat.
  if (!loaded) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-500">
        Memuat progres…
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:pt-14">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          🚀 Full Stack Learning Tracker
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          Lacak progres belajarmu satu per satu. Tiap topik punya tombol{" "}
          <span className="font-medium text-red-400">Materi</span> ke YouTube.
          Progres tersimpan otomatis di browser ini.
        </p>
      </div>

      {/* Kartu progres keseluruhan */}
      <div className="sticky top-3 z-10 mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/30 backdrop-blur-md">
        <ProgressBar
          value={completedCount}
          total={TOTAL_ITEMS}
          label="Total progres"
          size="lg"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {/* Filter */}
          <div className="flex gap-1 rounded-lg bg-slate-800/80 p-1">
            {(
              [
                ["all", "Semua"],
                ["todo", "Belum"],
                ["done", "Selesai"],
              ] as [Filter, string][]
            ).map(([key, txt]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  filter === key
                    ? "bg-sky-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {txt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle bahasa materi */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Materi:</span>
              <div className="flex gap-1 rounded-lg bg-slate-800/80 p-1">
                {(
                  [
                    ["id", "🇮🇩 ID"],
                    ["en", "🌐 EN"],
                  ] as [Lang, string][]
                ).map(([key, txt]) => (
                  <button
                    key={key}
                    onClick={() => setLang(key)}
                    className={`rounded-md px-2 py-1 font-medium transition ${
                      lang === key
                        ? "bg-slate-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {txt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm("Reset semua progres? Tindakan ini tidak bisa dibatalkan.")) {
                  reset();
                }
              }}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Daftar section */}
      <div className="flex flex-col gap-5">
        {ROADMAP.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            done={done}
            lang={lang}
            filter={filter}
            onToggle={toggle}
            onSetMany={setMany}
          />
        ))}
      </div>

      <footer className="mt-12 text-center text-xs text-slate-600">
        Dibuat sebagai pendamping{" "}
        <span className="text-slate-400">roadmap-fullstack-modern.md</span> · Progres
        disimpan lokal di browser ·{" "}
        <span className="text-slate-400">{completedCount}</span> dari {TOTAL_ITEMS} topik
        selesai
      </footer>
    </main>
  );
}
