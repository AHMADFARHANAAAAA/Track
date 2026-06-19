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
      className="shrink-0 rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
    >
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
        <YouTubeButton query={item.yt} lang={lang} />
      </div>
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

  const allIds = section.items.map((i) => i.id);
  const completed = allIds.filter((id) => done[id]).length;
  const total = allIds.length;
  const allDone = completed === total;

  const matchesFilter = (id: string) => {
    if (filter === "todo") return !done[id];
    if (filter === "done") return !!done[id];
    return true;
  };

  const visibleItems = section.items.filter((i) => matchesFilter(i.id));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/20 backdrop-blur">
      <header className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:gap-5">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-start gap-3 text-left"
          aria-expanded={open}
        >
          <span className="flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
                {section.title}
              </h2>
              {allDone && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  Selesai
                </span>
              )}
            </span>
            <p className="mt-0.5 text-sm text-slate-400">{section.blurb}</p>
          </span>
          <span className="shrink-0 text-xs font-medium text-slate-500">
            {open ? "Sembunyikan" : "Tampilkan"}
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

          {visibleItems.length === 0 ? (
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
        </div>
      )}
    </section>
  );
}
