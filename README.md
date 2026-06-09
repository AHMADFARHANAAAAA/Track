# 🚀 Full Stack Learning Tracker

Aplikasi Next.js untuk **melacak progres belajar full stack modern** satu per satu —
frontend, backend, DevOps, system design, CI/CD, security, vibe coding, dan lainnya.
Setiap topik dilengkapi tombol **Materi** yang membuka pencarian YouTube terkurasi
(bisa pilih bahasa 🇮🇩 Indonesia atau 🌐 Inggris).

Pendamping dari file `roadmap-fullstack-modern.md`.

## ✨ Fitur

- ✅ **Checklist interaktif** — centang tiap topik yang sudah kamu kuasai
- 📊 **Progress bar** total & per-section, dengan persentase
- 🎥 **Materi YouTube** per topik (toggle bahasa ID/EN)
- 🔍 **Filter** Semua / Belum / Selesai
- 💾 **Tersimpan otomatis** di browser (localStorage) — aman dari refresh & redeploy
- 🌙 Tema gelap, responsif (mobile-friendly)

## 🛠️ Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- Tanpa backend/database — progres disimpan di `localStorage` (fully static)

## 🏃 Menjalankan di Lokal

```bash
npm install      # sekali saja
npm run dev      # development server → http://localhost:3000
```

Build & jalankan versi produksi secara lokal:

```bash
npm run build
npm run start
```

## ☁️ Deploy ke Production

### Cara Tercepat — Vercel (rekomendasi)

1. Push repo ini ke GitHub:
   ```bash
   git add -A
   git commit -m "feat: learning tracker app"
   gh repo create learning-tracker --public --source=. --push
   # atau buat repo manual di github.com lalu:
   # git remote add origin https://github.com/<username>/learning-tracker.git
   # git push -u origin main
   ```
2. Buka [vercel.com/new](https://vercel.com/new), **Import** repo `learning-tracker`.
3. Vercel mendeteksi Next.js otomatis — klik **Deploy**. Selesai. 🎉

Setiap `git push` berikutnya akan auto-deploy (CI/CD bawaan Vercel).

### Alternatif — Vercel CLI

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

### Alternatif lain

Karena app ini fully static + Next.js, juga bisa di-deploy ke
**Netlify**, **Cloudflare Pages**, **Railway**, atau **Render** tanpa konfigurasi khusus.

## 📁 Struktur Proyek

```
src/
├─ app/
│  ├─ layout.tsx        # root layout + metadata + tema gelap
│  ├─ page.tsx          # halaman utama
│  └─ globals.css       # Tailwind + variabel tema
├─ components/
│  ├─ ChecklistApp.tsx  # orkestrasi: header, progres, filter, bahasa
│  ├─ SectionCard.tsx   # kartu per-section + daftar checklist
│  └─ ProgressBar.tsx   # bar progres reusable
├─ data/
│  └─ roadmap.ts        # SEMUA data checklist + query YouTube (edit di sini)
├─ hooks/
│  └─ useProgress.ts    # persistensi localStorage
└─ lib/
   └─ youtube.ts        # builder URL pencarian YouTube
```

## ✏️ Menambah / Mengubah Topik

Semua konten ada di **`src/data/roadmap.ts`**. Tambahkan item ke array `items`
pada section terkait:

```ts
{ id: "fe-99", label: "Topik baru kamu", yt: "kata kunci pencarian youtube" }
```

`id` harus unik. `yt` adalah query pencarian YouTube yang akan dibuka saat tombol
**Materi** diklik.
