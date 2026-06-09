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

  // Hindari kedipan: tampilkan keadaan tenang sampai progres bersama termuat.
  if (!loaded) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-500">
        Sebentar ya, sedang menyiapkan progres kita…
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:pt-14">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          Perjalanan Belajar Full Stack
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Kita belajar bersama. Setiap topik yang kamu tandai selesai langsung
          terlihat oleh semua orang—jadi progres di sini benar-benar milik kita
          bersama. Tiap topik punya tautan{" "}
          <span className="font-medium text-slate-300">Materi</span> ke YouTube,
          ambil yang paling cocok untukmu.
        </p>
      </div>

      {/* Kartu progres keseluruhan */}
      <div className="sticky top-3 z-10 mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/30 backdrop-blur-md">
        <ProgressBar
          value={completedCount}
          total={TOTAL_ITEMS}
          label="Progres kita bersama"
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
                    ["id", "Indonesia"],
                    ["en", "English"],
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
                if (
                  confirm(
                    "Reset progres untuk SEMUA orang? Karena progres ini dibagikan bersama, tindakan ini akan menghapus centang milik semua pengguna dan tidak bisa dibatalkan.",
                  )
                ) {
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

      <footer className="mt-12 text-center text-xs leading-relaxed text-slate-600">
        Teman seperjalanan untuk{" "}
        <span className="text-slate-400">roadmap-fullstack-modern.md</span>. Progres
        dibagikan untuk semua pembelajar · sejauh ini{" "}
        <span className="text-slate-400">{completedCount}</span> dari {TOTAL_ITEMS} topik
        sudah dituntaskan bersama. Tetap semangat, satu langkah tiap hari.
      </footer>
    </main>
  );
}
