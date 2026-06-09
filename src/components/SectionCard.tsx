"use client";

import { useState } from "react";
import type { Item, Section } from "@/data/roadmap";
import { ytSearchUrl, type Lang } from "@/lib/youtube";
import ProgressBar from "./ProgressBar";

type Props = {
  section: Section;
  done: Record<string, boolean>;
  lang: Lang;
  filter: "all" | "todo" | "done";
  onToggle: (id: string) => void;
  onSetMany: (ids: string[], value: boolean) => void;
};

function YouTubeButton({ query, lang }: { query: string; lang: Lang }) {
  return (
    <a
      href={ytSearchUrl(query, lang)}
      target="_blank"
      rel="noopener noreferrer"
      title="Cari materi di YouTube"
      className="flex shrink-0 items-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
      Materi
    </a>
  );
}

function ItemRow({
  item,
  checked,
  lang,
  onToggle,
}: {
  item: Item;
  checked: boolean;
  lang: Lang;
  onToggle: (id: string) => void;
}) {
  const [showSoal, setShowSoal] = useState(false);

  return (
    <li className="transition hover:bg-slate-800/40">
      <div className="flex items-center gap-3 px-5 py-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          id={item.id}
          className="h-5 w-5 shrink-0 cursor-pointer accent-emerald-500"
        />
        <label
          htmlFor={item.id}
          className={`flex-1 cursor-pointer text-sm ${
            checked ? "text-slate-500 line-through" : "text-slate-200"
          }`}
        >
          {item.label}
        </label>
        <button
          onClick={() => setShowSoal((s) => !s)}
          aria-expanded={showSoal}
          title="Lihat soal / tantangan praktik"
          className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
            showSoal
              ? "bg-amber-500/20 text-amber-300"
              : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
          }`}
        >
          🎯 Soal
        </button>
        <YouTubeButton query={item.yt} lang={lang} />
      </div>

      {showSoal && (
        <div className="mx-5 mb-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400/80">
            Tantangan praktik
          </p>
          <p className="mt-1 text-sm text-slate-200">{item.challenge}</p>
        </div>
      )}
    </li>
  );
}

export default function SectionCard({
  section,
  done,
  lang,
  filter,
  onToggle,
  onSetMany,
}: Props) {
  const [open, setOpen] = useState(true);

  const cap = section.capstone;
  const allIds = [...section.items.map((i) => i.id), cap.id];
  const completed = allIds.filter((id) => done[id]).length;
  const total = allIds.length;
  const allDone = completed === total;

  const matchesFilter = (id: string) => {
    if (filter === "todo") return !done[id];
    if (filter === "done") return !!done[id];
    return true;
  };

  const visibleItems = section.items.filter((i) => matchesFilter(i.id));
  const capVisible = matchesFilter(cap.id);
  const capDone = !!done[cap.id];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/20 backdrop-blur">
      <header className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:gap-5">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-start gap-3 text-left"
          aria-expanded={open}
        >
          <span className="text-2xl leading-none">{section.emoji}</span>
          <span className="flex-1">
            <span className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
                {section.title}
              </h2>
              {allDone && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  ✓ Selesai
                </span>
              )}
            </span>
            <p className="mt-0.5 text-sm text-slate-400">{section.blurb}</p>
          </span>
          <span
            className="text-slate-500 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          >
            ▾
          </span>
        </button>
        <div className="w-full shrink-0 sm:w-48">
          <ProgressBar value={completed} total={total} label={`${completed}/${total}`} />
        </div>
      </header>

      {open && (
        <div className="divide-y divide-slate-800/70">
          <div className="flex flex-wrap gap-2 px-5 py-3">
            <button
              onClick={() => onSetMany(allIds, true)}
              className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
            >
              Tandai semua selesai
            </button>
            <button
              onClick={() => onSetMany(allIds, false)}
              className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
            >
              Hapus tanda
            </button>
          </div>

          {visibleItems.length === 0 && !capVisible ? (
            <p className="px-5 py-6 text-center text-sm text-slate-500">
              Tidak ada item pada filter ini.
            </p>
          ) : (
            <ul>
              {visibleItems.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  checked={!!done[item.id]}
                  lang={lang}
                  onToggle={onToggle}
                />
              ))}
            </ul>
          )}

          {/* Kartu Capstone */}
          {capVisible && (
            <div className="p-5">
              <div
                className={`rounded-xl border p-4 transition ${
                  capDone
                    ? "border-emerald-500/30 bg-emerald-500/[0.06]"
                    : "border-violet-500/30 bg-violet-500/[0.07]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={capDone}
                    onChange={() => onToggle(cap.id)}
                    id={cap.id}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-violet-500"
                  />
                  <div className="flex-1">
                    <label htmlFor={cap.id} className="cursor-pointer">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-violet-500/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-violet-300">
                          🏆 Capstone
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            capDone ? "text-slate-400 line-through" : "text-slate-100"
                          }`}
                        >
                          {cap.title}
                        </span>
                      </span>
                      <p className="mt-1.5 text-sm text-slate-300">{cap.brief}</p>
                    </label>
                    <ul className="mt-3 space-y-1.5">
                      {cap.criteria.map((c, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-xs text-slate-400"
                        >
                          <span className="mt-0.5 shrink-0 text-violet-400">▸</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
