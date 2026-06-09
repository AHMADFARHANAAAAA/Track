// Penyimpanan progres BERSAMA untuk semua pengguna.
// Disimpan sebagai satu file JSON di server, bukan di localStorage tiap browser,
// supaya progres yang ditandai siapa pun langsung terlihat oleh semua orang.
//
// Lokasi file bisa diatur lewat env `DATA_DIR` (default: <cwd>/data).
// Saat deploy Docker, arahkan ke volume agar progres tidak hilang ketika rebuild.

import { promises as fs } from "fs";
import path from "path";

export type ProgressMap = Record<string, boolean>;

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "progress.json");

// Semua operasi baca-ubah-tulis di-antrekan agar tidak saling menimpa
// ketika beberapa pengguna mengubah progres bersamaan.
let chain: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn);
  chain = run.catch(() => {});
  return run;
}

async function readMap(): Promise<ProgressMap> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as ProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    // File belum ada / rusak — anggap kosong.
    return {};
  }
}

async function writeMap(map: ProgressMap): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(map), "utf8");
}

/** Ambil seluruh progres bersama. */
export function getProgress(): Promise<ProgressMap> {
  return withLock(readMap);
}

/** Tandai sejumlah id sebagai selesai (value=true) atau belum (value=false). */
export function applyProgress(ids: string[], value: boolean): Promise<ProgressMap> {
  return withLock(async () => {
    const map = await readMap();
    for (const id of ids) {
      if (value) map[id] = true;
      else delete map[id]; // simpan hanya yang selesai → file tetap ramping
    }
    await writeMap(map);
    return map;
  });
}

/** Kosongkan seluruh progres bersama. */
export function resetProgress(): Promise<ProgressMap> {
  return withLock(async () => {
    await writeMap({});
    return {};
  });
}
