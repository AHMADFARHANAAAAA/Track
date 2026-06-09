"use client";

import { useState } from "react";
import type { Section } from "@/data/roadmap";
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

export default function SectionCard({
  section,
  done,
  lang,
  filter,
  onToggle,
  onSetMany,
}: Props) {
  const [open, setOpen] = useState(true);

  const completed = section.items.filter((i) => done[i.id]).length;
  const total = section.items.length;
  const allDone = completed === total;

  const visibleItems = section.items.filter((i) => {
    if (filter === "todo") return !done[i.id];
    if (filter === "done") return done[i.id];
    return true;
  });

  const ids = section.items.map((i) => i.id);

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
          <span className="text-slate-500 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none" }}>
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
              onClick={() => onSetMany(ids, true)}
              className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
            >
              Tandai semua selesai
            </button>
            <button
              onClick={() => onSetMany(ids, false)}
              className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
            >
              Hapus tanda
            </button>
          </div>

          {visibleItems.length === 0 ? (
            <p className="px-5 py-6 text-center text-sm text-slate-500">
              Tidak ada item pada filter ini.
            </p>
          ) : (
            <ul>
              {visibleItems.map((item) => {
                const checked = !!done[item.id];
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-800/40"
                  >
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
                    <a
                      href={ytSearchUrl(item.yt, lang)}
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
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
