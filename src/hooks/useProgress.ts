"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ProgressMap = Record<string, boolean>;

// Seberapa sering menyegarkan progres dari server agar tersinkron antar-pengguna.
const POLL_MS = 5000;

// Prefix subpath (mis. "/learning-tracker" di produksi). fetch() TIDAK otomatis
// mendapat basePath, jadi tempelkan manual ke endpoint API.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const API_URL = `${BASE}/api/progress`;

/**
 * Progres BERSAMA: dibaca & disimpan ke server (/api/progress), bukan localStorage.
 * Artinya apa pun yang ditandai oleh siapa pun terlihat oleh semua pengguna.
 * - Update optimistik: UI berubah seketika, lalu dikonfirmasi oleh server.
 * - Polling berkala menyegarkan perubahan dari pengguna lain.
 */
export function useProgress() {
  const [done, setDone] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);

  // Cermin `done` terkini untuk dibaca di dalam callback tanpa memicu re-render.
  const doneRef = useRef<ProgressMap>({});
  useEffect(() => {
    doneRef.current = done;
  }, [done]);

  // Jumlah penyimpanan yang sedang berjalan; selama > 0 polling tidak menimpa UI.
  const savingRef = useRef(0);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { done?: ProgressMap };
      if (savingRef.current === 0) setDone(data.done ?? {});
    } catch {
      // Offline / gangguan jaringan — pertahankan state terakhir.
    }
  }, []);

  // Muat awal.
  useEffect(() => {
    (async () => {
      await fetchProgress();
      setLoaded(true);
    })();
  }, [fetchProgress]);

  // Polling agar progres semua pengguna tetap sinkron.
  useEffect(() => {
    const t = setInterval(fetchProgress, POLL_MS);
    return () => clearInterval(t);
  }, [fetchProgress]);

  const save = useCallback(
    async (
      body: Record<string, unknown>,
      optimistic: (prev: ProgressMap) => ProgressMap,
    ) => {
      setDone(optimistic);
      savingRef.current += 1;
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const data = (await res.json()) as { done?: ProgressMap };
          setDone(data.done ?? {});
        } else {
          await fetchProgress(); // gagal — pulihkan dari server
        }
      } catch {
        await fetchProgress();
      } finally {
        savingRef.current -= 1;
      }
    },
    [fetchProgress],
  );

  const toggle = useCallback(
    (id: string) => {
      const value = !doneRef.current[id];
      void save({ ids: [id], value }, (prev) => ({ ...prev, [id]: value }));
    },
    [save],
  );

  const setMany = useCallback(
    (ids: string[], value: boolean) => {
      void save({ ids, value }, (prev) => {
        const next = { ...prev };
        for (const id of ids) next[id] = value;
        return next;
      });
    },
    [save],
  );

  const reset = useCallback(() => {
    void save({ reset: true }, () => ({}));
  }, [save]);

  return { done, loaded, toggle, setMany, reset };
}
