"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "lt-progress-v1";

type ProgressMap = Record<string, boolean>;

/**
 * Menyimpan status checklist (id -> selesai) di localStorage.
 * Persisten antar-refresh & antar-deploy karena tersimpan di browser pengguna.
 */
export function useProgress() {
  const [done, setDone] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);

  // Muat dari localStorage saat mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      // abaikan data rusak
    }
    setLoaded(true);
  }, []);

  // Simpan tiap kali berubah (setelah load awal).
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // storage penuh / diblokir — abaikan
    }
  }, [done, loaded]);

  const toggle = useCallback((id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const setMany = useCallback((ids: string[], value: boolean) => {
    setDone((prev) => {
      const next = { ...prev };
      for (const id of ids) next[id] = value;
      return next;
    });
  }, []);

  const reset = useCallback(() => setDone({}), []);

  return { done, loaded, toggle, setMany, reset };
}
