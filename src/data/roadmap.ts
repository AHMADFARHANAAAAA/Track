// Data roadmap pembelajaran full stack modern.
// Setiap item punya:
//   - `yt`: kata kunci pencarian YouTube terkurasi (link tidak mati & selalu materi terbaru)
//   - `challenge`: soal/tantangan praktik konkret untuk topik tersebut
// Setiap section punya `capstone`: proyek mini yang menggabungkan seluruh topik di section itu.

export type Item = {
  id: string;
  label: string;
  yt: string; // query pencarian YouTube
  challenge: string; // soal / tantangan praktik
};

export type Capstone = {
  id: string;
  title: string;
  brief: string;
  criteria: string[]; // kriteria selesai
};

export type Section = {
  id: string;
  emoji: string;
  title: string;
  blurb: string;
  items: Item[];
  capstone: Capstone;
};

export const ROADMAP: Section[] = [
  {
    id: "fondasi",
    emoji: "🧱",
    title: "0. Fondasi Wajib (Prasyarat)",
    blurb:
      "Jangan dilewati. Banyak developer stuck di level menengah karena fondasinya bolong.",
    items: [
      { id: "f-1", label: "Cara kerja komputer (CPU, RAM, storage)", yt: "how computers work cpu ram explained", challenge: "Gambar diagram alur data dari penekanan tombol keyboard hingga muncul di layar (CPU ↔ RAM ↔ storage)." },
      { id: "f-2", label: "Cara kerja internet: DNS, IP, TCP/IP, HTTP/HTTPS", yt: "how the internet works dns http tcp ip", challenge: "Jalankan `nslookup` & `ping` ke sebuah domain, catat IP & latensinya, lalu jelaskan tiap langkah DNS resolution." },
      { id: "f-3", label: "Request–Response cycle (apa yang terjadi saat ketik google.com)", yt: "what happens when you type a url into browser", challenge: "Buka DevTools tab Network, muat sebuah situs, dan jelaskan 3 request pertama beserta status code-nya." },
      { id: "f-4", label: "Client vs Server", yt: "client server architecture explained", challenge: "Buat 1 file HTML lalu sajikan via `npx serve`; tunjuk mana bagian client dan mana server." },
      { id: "f-5", label: "HTTP status codes & methods (GET, POST, PUT, DELETE)", yt: "http methods status codes explained", challenge: "Pakai curl/Postman lakukan GET & POST ke jsonplaceholder, lalu bandingkan respons & status code-nya." },
      { id: "f-6", label: "Command line / Terminal: navigasi & operasi file", yt: "command line terminal tutorial for beginners", challenge: "Lewat terminal saja (tanpa GUI): buat folder, 3 file, rename, pindahkan, lalu hapus salah satunya." },
      { id: "f-7", label: "Shell scripting dasar (Bash / PowerShell)", yt: "bash scripting tutorial for beginners", challenge: "Tulis skrip yang menghitung jumlah file `.txt` di sebuah folder dan menampilkannya." },
      { id: "f-8", label: "Git: add, commit, push, pull, clone", yt: "git tutorial for beginners crash course", challenge: "Buat repo baru, lakukan 3 commit bermakna, lalu tampilkan riwayatnya dengan `git log --oneline`." },
      { id: "f-9", label: "Git: branching, merging, resolusi konflik", yt: "git branching merging conflict resolution tutorial", challenge: "Buat branch fitur, picu konflik sengaja dengan main, lalu selesaikan merge conflict-nya." },
      { id: "f-10", label: "Pull Request workflow & Conventional Commits", yt: "github pull request workflow conventional commits", challenge: "Buka 1 Pull Request di GitHub dengan judul ber-Conventional Commit dan deskripsi yang jelas." },
      { id: "f-11", label: "Logika pemrograman: variabel, kondisional, loop, fungsi", yt: "programming basics variables loops functions", challenge: "Tulis fungsi FizzBuzz 1–100 dari nol tanpa melihat contoh." },
      { id: "f-12", label: "Struktur data: array, object, set, stack, queue", yt: "data structures explained array stack queue", challenge: "Implementasikan stack & queue sederhana memakai array, lengkap dengan push/pop/enqueue/dequeue." },
      { id: "f-13", label: "Algoritma & Big-O (sorting, searching)", yt: "big o notation explained algorithms", challenge: "Implementasikan binary search dan jelaskan kenapa kompleksitasnya O(log n)." },
      { id: "f-14", label: "TypeScript dasar (type system sejak awal)", yt: "typescript tutorial for beginners crash course", challenge: "Konversi 1 file JavaScript ke TypeScript: beri tipe semua fungsi & hilangkan seluruh `any`." },
    ],
    capstone: {
      id: "cap-fondasi",
      title: "Capstone: Dev Environment & Git Workflow",
      brief: "Siapkan environment ngoding lengkap dan tunjukkan alur kerja Git ala profesional.",
      criteria: [
        "Setup terminal + Git + editor, lalu buat repo publik dengan README",
        "Kerjakan perubahan lewat branch → Pull Request (bukan langsung ke main)",
        "Tulis 3 program kecil dalam TypeScript: FizzBuzz, stack/queue, binary search",
        "Riwayat commit rapi memakai Conventional Commits",
      ],
    },
  },
  {
    id: "frontend",
    emoji: "🎨",
    title: "1. Frontend Development",
    blurb: "Membangun antarmuka yang dilihat & diinteraksikan pengguna.",
    items: [
      { id: "fe-1", label: "HTML semantic, accessibility (a11y), SEO dasar", yt: "semantic html accessibility tutorial", challenge: "Bangun halaman artikel pakai tag semantik (header/nav/main/article/footer) dengan skor Lighthouse a11y > 90." },
      { id: "fe-2", label: "CSS: box model, Flexbox, Grid, responsive design", yt: "css flexbox grid responsive tutorial", challenge: "Buat layout kartu responsif: 3 kolom di desktop → 1 kolom di mobile, memakai Grid + Flexbox tanpa framework." },
      { id: "fe-3", label: "CSS modern: custom properties, container queries, clamp()", yt: "modern css custom properties container queries", challenge: "Buat tema terang/gelap memakai CSS custom properties + tombol toggle." },
      { id: "fe-4", label: "JavaScript ES6+: DOM, events, fetch, async/await, modules", yt: "javascript es6 dom fetch async await tutorial", challenge: "Buat to-do list vanilla JS (tambah, hapus, tandai selesai) tanpa library apa pun." },
      { id: "fe-5", label: "Package manager: npm / pnpm / bun", yt: "npm pnpm bun package manager explained", challenge: "Inisialisasi proyek, install 1 dependency, lalu jelaskan isi `package.json` & lockfile-nya." },
      { id: "fe-6", label: "Build tool: Vite", yt: "vite tutorial crash course", challenge: "Scaffold proyek Vite + React, jalankan dev server, dan lakukan 1 build produksi." },
      { id: "fe-7", label: "Linting & formatting: ESLint + Prettier", yt: "eslint prettier setup tutorial", challenge: "Setup ESLint + Prettier pada proyek dan perbaiki semua warning yang muncul." },
      { id: "fe-8", label: "React: hooks, state, props, component lifecycle", yt: "react tutorial for beginners hooks state props", challenge: "Buat komponen Counter + komponen daftar yang me-render array lewat props." },
      { id: "fe-9", label: "State management: Zustand, TanStack Query", yt: "zustand tanstack query react state management", challenge: "Ambil data API publik dengan TanStack Query (loading/error/success) dan simpan filter di Zustand." },
      { id: "fe-10", label: "Routing: React Router / TanStack Router", yt: "react router tutorial", challenge: "Buat app 3 halaman (Home, About, Detail/:id) dengan navigasi & route param." },
      { id: "fe-11", label: "Next.js: App Router, SSR, SSG, Server Components", yt: "nextjs app router server components tutorial", challenge: "Buat halaman Next.js dengan Server Component yang fetch data + 1 Client Component interaktif." },
      { id: "fe-12", label: "Rendering strategies: CSR vs SSR vs SSG vs ISR", yt: "csr ssr ssg isr rendering explained nextjs", challenge: "Buat 1 halaman SSG dan 1 halaman SSR di Next.js, lalu jelaskan bedanya saat di-refresh." },
      { id: "fe-13", label: "Tailwind CSS (utility-first)", yt: "tailwind css full tutorial", challenge: "Bangun ulang sebuah landing page favoritmu memakai Tailwind saja." },
      { id: "fe-14", label: "Component library: shadcn/ui + Radix", yt: "shadcn ui tutorial", challenge: "Pasang shadcn/ui, buat form (Dialog + Input + Button) yang tervalidasi." },
      { id: "fe-15", label: "Web performance: Core Web Vitals, lazy loading, code splitting", yt: "web performance core web vitals optimization", challenge: "Audit sebuah halaman dengan Lighthouse, terapkan lazy load gambar, capai skor performa > 90." },
      { id: "fe-16", label: "Accessibility (WCAG), ARIA, keyboard navigation", yt: "web accessibility wcag aria tutorial", challenge: "Buat modal yang bisa dibuka/ditutup & dinavigasi penuh hanya memakai keyboard." },
      { id: "fe-17", label: "Testing: Vitest, React Testing Library, Playwright (E2E)", yt: "react testing vitest playwright tutorial", challenge: "Tulis 1 unit test (Vitest) + 1 test E2E (Playwright) untuk fitur to-do list-mu." },
    ],
    capstone: {
      id: "cap-frontend",
      title: "Capstone: Portfolio + Dashboard SPA",
      brief: "Bangun website portofolio responsif + 1 SPA yang mengonsumsi API publik.",
      criteria: [
        "Next.js + Tailwind, fully responsive (mobile → desktop)",
        "Fetch data dari API publik dengan TanStack Query (state loading/error)",
        "Routing antar-halaman + halaman detail dinamis",
        "Skor Lighthouse a11y & performa > 90, plus minimal 1 test",
        "Deploy live (Vercel) dan bagikan tautannya",
      ],
    },
  },
  {
    id: "backend",
    emoji: "⚙️",
    title: "2. Backend Development",
    blurb: "Logika server, API, autentikasi, dan pemrosesan data.",
    items: [
      { id: "be-1", label: "Cara kerja server & HTTP server lifecycle", yt: "how web servers work backend explained", challenge: "Buat HTTP server minimal (tanpa framework) yang merespons 'Hello' di port 3000." },
      { id: "be-2", label: "REST API design (resource, versioning, idempotency)", yt: "rest api design best practices tutorial", challenge: "Desain & implementasikan REST API CRUD untuk resource `books` (5 endpoint)." },
      { id: "be-3", label: "Authentication vs Authorization", yt: "authentication vs authorization explained", challenge: "Buat endpoint `/me` yang hanya bisa diakses user terautentikasi; tunjukkan beda authn & authz di kodenya." },
      { id: "be-4", label: "Sessions, JWT, OAuth 2.0 / OpenID Connect", yt: "jwt oauth2 openid connect explained tutorial", challenge: "Implementasikan login yang mengembalikan JWT, lalu lindungi route memakai token tersebut." },
      { id: "be-5", label: "Middleware, validasi request, error handling", yt: "backend middleware validation error handling", challenge: "Buat middleware logging + validasi body, dan satu error handler terpusat." },
      { id: "be-6", label: "Environment config & secrets management", yt: "environment variables secrets management tutorial", challenge: "Pindahkan semua konfigurasi (port, secret, DB URL) ke `.env` dan validasi saat startup." },
      { id: "be-7", label: "Node.js + TypeScript (Express / Fastify / Hono / NestJS)", yt: "nodejs typescript backend api tutorial fastify hono", challenge: "Bangun REST API dengan Fastify/Hono + TypeScript berisi minimal 4 endpoint." },
      { id: "be-8", label: "Alternatif: Python FastAPI / Go", yt: "fastapi python tutorial OR go backend tutorial", challenge: "Bangun ulang API yang sama di FastAPI atau Go, lalu bandingkan pengalamannya." },
      { id: "be-9", label: "GraphQL: schema, resolvers, kapan dipakai", yt: "graphql tutorial for beginners", challenge: "Buat GraphQL API dengan 1 query & 1 mutation untuk resource `todos`." },
      { id: "be-10", label: "gRPC untuk komunikasi antar-service", yt: "grpc tutorial explained", challenge: "Definisikan file `.proto` dan buat 1 layanan gRPC sederhana (mis. Greeter)." },
      { id: "be-11", label: "WebSockets / SSE (real-time)", yt: "websockets server sent events realtime tutorial", challenge: "Buat chat room real-time sederhana memakai WebSocket." },
      { id: "be-12", label: "tRPC (type-safe API)", yt: "trpc tutorial nextjs", challenge: "Setup tRPC di Next.js dan buat 1 prosedur query end-to-end yang type-safe." },
      { id: "be-13", label: "API documentation: OpenAPI / Swagger", yt: "openapi swagger api documentation tutorial", challenge: "Dokumentasikan API-mu dengan OpenAPI lalu buka di Swagger UI." },
      { id: "be-14", label: "Background jobs & message queues (Redis, RabbitMQ, Kafka)", yt: "message queue redis rabbitmq kafka tutorial", challenge: "Kirim email/notifikasi (simulasi) lewat background job memakai Redis + BullMQ." },
      { id: "be-15", label: "Caching strategies (cache-aside, write-through, TTL)", yt: "caching strategies explained backend", challenge: "Tambahkan cache (Redis/in-memory) pada endpoint berat & ukur peningkatan latensinya." },
      { id: "be-16", label: "Rate limiting & throttling", yt: "api rate limiting tutorial", challenge: "Terapkan rate limiter (mis. 100 req/menit) pada API-mu lalu uji saat terlampaui." },
      { id: "be-17", label: "Testing backend: unit, integration, contract", yt: "backend api testing tutorial integration", challenge: "Tulis integration test untuk endpoint CRUD memakai database test." },
    ],
    capstone: {
      id: "cap-backend",
      title: "Capstone: REST API Produksi dengan Auth",
      brief: "Bangun REST API siap-produksi untuk satu domain (mis. blog) lengkap dengan autentikasi.",
      criteria: [
        "CRUD penuh + autentikasi JWT (register, login, route terlindungi)",
        "Validasi input + error handling terpusat",
        "Rate limiting & konfigurasi via environment variables",
        "Dokumentasi OpenAPI/Swagger",
        "Minimal beberapa integration test yang hijau",
      ],
    },
  },
  {
    id: "database",
    emoji: "🗄️",
    title: "3. Database & Penyimpanan Data",
    blurb: "Menyimpan, menanyakan, dan menskalakan data dengan andal.",
    items: [
      { id: "db-1", label: "PostgreSQL: SELECT, JOIN, GROUP BY, subquery", yt: "postgresql sql tutorial for beginners joins", challenge: "Tulis query JOIN 3 tabel (users, orders, products) untuk menampilkan riwayat pesanan." },
      { id: "db-2", label: "Window functions & query lanjutan", yt: "sql window functions tutorial", challenge: "Pakai window function untuk menghitung running total penjualan per bulan." },
      { id: "db-3", label: "Schema design & normalisasi (1NF–3NF)", yt: "database normalization 1nf 2nf 3nf tutorial", challenge: "Desain skema ternormalisasi untuk aplikasi blog (users, posts, comments, tags)." },
      { id: "db-4", label: "Indexing & query optimization (EXPLAIN ANALYZE)", yt: "database indexing query optimization explain analyze", challenge: "Buat indeks pada kolom yang sering difilter, lalu bandingkan EXPLAIN ANALYZE sebelum/sesudah." },
      { id: "db-5", label: "Transactions & ACID, isolation levels", yt: "database transactions acid isolation levels explained", challenge: "Tulis transaksi transfer saldo antar-akun yang aman walau gagal di tengah." },
      { id: "db-6", label: "Migrations", yt: "database migrations tutorial", challenge: "Buat 2 migrasi (tambah tabel, lalu tambah kolom) dan jalankan rollback-nya." },
      { id: "db-7", label: "MongoDB (document database)", yt: "mongodb tutorial for beginners", challenge: "Modelkan & simpan data produk e-commerce di MongoDB, lalu query dengan filter & sort." },
      { id: "db-8", label: "Redis (cache / key-value)", yt: "redis tutorial for beginners caching", challenge: "Pakai Redis untuk menyimpan session/cache dengan TTL 60 detik." },
      { id: "db-9", label: "Vector DB untuk AI (pgvector, Qdrant)", yt: "vector database pgvector qdrant tutorial", challenge: "Simpan embedding teks ke pgvector dan lakukan pencarian kemiripan (similarity search)." },
      { id: "db-10", label: "ORM: Prisma / Drizzle", yt: "prisma drizzle orm tutorial typescript", challenge: "Modelkan skema blog dengan Prisma/Drizzle dan lakukan query relasi (post + author)." },
      { id: "db-11", label: "Connection pooling", yt: "database connection pooling explained", challenge: "Konfigurasi connection pool dan jelaskan apa yang terjadi saat koneksi habis." },
      { id: "db-12", label: "Replication, sharding, CAP theorem", yt: "database replication sharding cap theorem explained", challenge: "Buat diagram arsitektur read-replica untuk aplikasi yang read-heavy." },
    ],
    capstone: {
      id: "cap-database",
      title: "Capstone: Skema & Query untuk App Nyata",
      brief: "Desain database ternormalisasi + lapisan ORM untuk e-commerce mini.",
      criteria: [
        "Skema 3NF + migrasi yang bisa di-rollback",
        "Indeks pada kolom yang sering difilter",
        "Transaksi yang aman untuk operasi kritis (mis. checkout)",
        "Query relasi via ORM (Prisma/Drizzle)",
        "Satu lapisan cache Redis untuk query yang berat",
      ],
    },
  },
  {
    id: "devops",
    emoji: "🔧",
    title: "4. DevOps & Infrastruktur",
    blurb: "Menjalankan & mengoperasikan aplikasi di server / cloud.",
    items: [
      { id: "do-1", label: "Linux server: permissions, processes, systemd, logs", yt: "linux server administration tutorial for beginners", challenge: "Di VPS/VM: buat user non-root, atur permission folder, dan baca log service dengan `journalctl`." },
      { id: "do-2", label: "SSH, firewall, reverse proxy (Nginx / Caddy)", yt: "nginx reverse proxy ssh tutorial", challenge: "Setup Nginx sebagai reverse proxy untuk app Node-mu di port 3000." },
      { id: "do-3", label: "DNS, SSL/TLS (Let's Encrypt)", yt: "ssl tls lets encrypt dns tutorial", challenge: "Pasang sertifikat HTTPS gratis (Let's Encrypt) pada sebuah domain." },
      { id: "do-4", label: "Load balancing dasar", yt: "load balancing explained tutorial", challenge: "Konfigurasi load balancer sederhana untuk 2 instance app dan uji distribusinya." },
      { id: "do-5", label: "Docker: images, containers, Dockerfile, multi-stage", yt: "docker tutorial for beginners full course", challenge: "Tulis Dockerfile multi-stage untuk app-mu sehingga image akhir < 200MB." },
      { id: "do-6", label: "Docker Compose (multi-container)", yt: "docker compose tutorial", challenge: "Buat docker-compose berisi app + PostgreSQL + Redis yang jalan dengan 1 perintah." },
      { id: "do-7", label: "Container registry (Docker Hub, GHCR)", yt: "docker registry push image tutorial", challenge: "Build image, push ke GHCR/Docker Hub, lalu pull & jalankan di mesin lain." },
      { id: "do-8", label: "Kubernetes: pods, deployments, services, ingress", yt: "kubernetes tutorial for beginners", challenge: "Deploy app-mu ke cluster lokal (kind/minikube) dengan Deployment + Service + Ingress." },
      { id: "do-9", label: "Helm (package manager K8s)", yt: "helm kubernetes tutorial", challenge: "Kemas app Kubernetes-mu jadi 1 Helm chart yang bisa di-install." },
      { id: "do-10", label: "Cloud: AWS (EC2, S3, RDS, Lambda, VPC, IAM)", yt: "aws tutorial for beginners ec2 s3 lambda", challenge: "Deploy app ke AWS (EC2 atau Lambda) dan simpan file di S3." },
      { id: "do-11", label: "PaaS: Vercel / Railway / Render / Fly.io", yt: "deploy app vercel railway render tutorial", challenge: "Deploy app-mu ke Railway/Render lengkap dengan database terkelola." },
      { id: "do-12", label: "Infrastructure as Code: Terraform", yt: "terraform tutorial for beginners", challenge: "Provision 1 resource cloud (bucket/VM) sepenuhnya lewat Terraform." },
      { id: "do-13", label: "Monitoring: Prometheus + Grafana", yt: "prometheus grafana monitoring tutorial", challenge: "Pasang Prometheus + Grafana dan buat 1 dashboard metrik app-mu." },
      { id: "do-14", label: "Logging terpusat (Loki / ELK)", yt: "centralized logging loki elk stack tutorial", challenge: "Kirim log app ke Loki/ELK dan cari error tertentu lewat query." },
      { id: "do-15", label: "Error tracking (Sentry) & observability", yt: "sentry error tracking observability tutorial", challenge: "Integrasikan Sentry dan picu 1 error sengaja untuk melihatnya tertangkap." },
    ],
    capstone: {
      id: "cap-devops",
      title: "Capstone: Containerize & Deploy",
      brief: "Bungkus app full stack-mu dalam Docker dan deploy ke cloud dengan monitoring.",
      criteria: [
        "Dockerfile multi-stage + docker-compose (app + database)",
        "Ter-deploy ke cloud/PaaS dengan HTTPS aktif",
        "Reverse proxy (Nginx) atau ingress terkonfigurasi",
        "Dashboard monitoring (Grafana) + error tracking (Sentry)",
      ],
    },
  },
  {
    id: "cicd",
    emoji: "🔁",
    title: "5. CI/CD",
    blurb: "Build, test, dan rilis otomatis setiap perubahan kode.",
    items: [
      { id: "ci-1", label: "Konsep CI vs CD (integration vs delivery/deployment)", yt: "ci cd explained continuous integration deployment", challenge: "Tulis penjelasan 1 paragraf beda CI, Continuous Delivery, & Continuous Deployment dengan contoh." },
      { id: "ci-2", label: "Pipeline stages: lint → test → build → deploy", yt: "ci cd pipeline stages tutorial", challenge: "Buat pipeline yang menjalankan lint → test → build secara berurutan." },
      { id: "ci-3", label: "GitHub Actions (workflow, secrets, caching)", yt: "github actions tutorial for beginners", challenge: "Buat GitHub Actions yang menjalankan test otomatis setiap push & Pull Request." },
      { id: "ci-4", label: "Docker build & push dalam pipeline", yt: "github actions docker build push tutorial", challenge: "Tambahkan job yang build & push Docker image saat merge ke main." },
      { id: "ci-5", label: "Strategi deploy: blue-green, canary, rolling", yt: "blue green canary rolling deployment explained", challenge: "Simulasikan canary/blue-green: arahkan versi baru ke sebagian trafik dulu." },
      { id: "ci-6", label: "Feature flags & rollback strategy", yt: "feature flags rollback deployment tutorial", challenge: "Tambahkan 1 feature flag yang bisa menyalakan/mematikan fitur tanpa redeploy." },
      { id: "ci-7", label: "Environment: dev → staging → production", yt: "dev staging production environments explained", challenge: "Setup 2 environment (staging & production) dengan secret yang berbeda." },
      { id: "ci-8", label: "Automated testing dalam pipeline & quality gates", yt: "automated testing ci pipeline quality gates", challenge: "Tambahkan quality gate: pipeline gagal bila coverage test < 70%." },
      { id: "ci-9", label: "Semantic versioning & changelog otomatis", yt: "semantic versioning automated release tutorial", challenge: "Otomatiskan rilis + changelog dengan semantic-release/Conventional Commits." },
    ],
    capstone: {
      id: "cap-cicd",
      title: "Capstone: Pipeline End-to-End",
      brief: "Buat pipeline CI/CD yang otomatis dari `git push` hingga production.",
      criteria: [
        "GitHub Actions menjalankan lint + test + build di tiap push/PR",
        "Build & push Docker image otomatis saat merge ke main",
        "Deploy otomatis: staging → production",
        "Quality gate (coverage) + rilis bersemantic versioning",
      ],
    },
  },
  {
    id: "system-design",
    emoji: "🏛️",
    title: "6. System Design",
    blurb: "Yang membedakan junior & senior. Pelajari setelah nyaman FE + BE.",
    items: [
      { id: "sd-1", label: "Scalability: vertical vs horizontal scaling", yt: "scalability vertical horizontal scaling explained", challenge: "Buat diagram & jelaskan kapan memilih horizontal vs vertical scaling untuk sebuah app." },
      { id: "sd-2", label: "Latency vs throughput", yt: "latency vs throughput explained", challenge: "Ukur p50/p95 latency endpoint-mu dan jelaskan bedanya dengan throughput." },
      { id: "sd-3", label: "Load balancing & caching layers (CDN, app, db)", yt: "load balancer caching cdn system design", challenge: "Rancang strategi cache 3 lapis (CDN, app, DB) untuk halaman produk." },
      { id: "sd-4", label: "Database scaling: replication, sharding, partitioning", yt: "database sharding partitioning system design", challenge: "Rancang skema sharding untuk tabel users 100 juta baris; jelaskan shard key-nya." },
      { id: "sd-5", label: "CAP theorem & trade-off konsistensi", yt: "cap theorem system design explained", challenge: "Untuk 3 sistem berbeda, tentukan pilihan CP vs AP beserta alasannya." },
      { id: "sd-6", label: "Monolith vs Microservices vs Modular Monolith", yt: "monolith vs microservices explained", challenge: "Pecah 1 monolith hipotetis jadi 3 microservice; gambar batas & komunikasinya." },
      { id: "sd-7", label: "Event-driven architecture & pub/sub", yt: "event driven architecture pub sub explained", challenge: "Rancang alur pemrosesan order memakai message queue (pub/sub)." },
      { id: "sd-8", label: "CQRS & Event Sourcing", yt: "cqrs event sourcing explained tutorial", challenge: "Jelaskan dengan diagram kapan CQRS + Event Sourcing layak (dan kapan berlebihan)." },
      { id: "sd-9", label: "API Gateway, circuit breaker, idempotency", yt: "api gateway circuit breaker idempotency system design", challenge: "Rancang API Gateway dengan rate limit + circuit breaker untuk 3 service." },
      { id: "sd-10", label: "Saga pattern (distributed transactions)", yt: "saga pattern distributed transactions explained", challenge: "Rancang saga untuk transaksi 'pesan tiket' lintas 3 service dengan langkah kompensasi." },
      { id: "sd-11", label: "Latihan: design URL shortener", yt: "system design url shortener interview", challenge: "Desain lengkap URL shortener: API, skema DB, cara generate ID, estimasi kapasitas." },
      { id: "sd-12", label: "Latihan: design chat app / news feed", yt: "system design chat application news feed", challenge: "Desain arsitektur chat app real-time untuk 1 juta user aktif." },
      { id: "sd-13", label: "Latihan: design rate limiter", yt: "system design rate limiter interview", challenge: "Desain distributed rate limiter (token bucket) lintas banyak server." },
      { id: "sd-14", label: "Estimasi kapasitas (back-of-the-envelope)", yt: "back of envelope estimation system design", challenge: "Hitung estimasi storage & QPS untuk app dengan 10 juta DAU." },
    ],
    capstone: {
      id: "cap-system-design",
      title: "Capstone: Dokumen Desain Sistem",
      brief: "Tulis dokumen desain lengkap untuk satu sistem skala besar pilihanmu.",
      criteria: [
        "Requirement (fungsional & non-fungsional) + estimasi kapasitas",
        "Diagram arsitektur high-level dengan komponen & alur data",
        "Pilihan database, caching, dan load balancing beserta alasan",
        "Pembahasan trade-off (CAP) + penanganan bottleneck & failure",
      ],
    },
  },
  {
    id: "security",
    emoji: "🔐",
    title: "7. Keamanan (Security)",
    blurb: "Sering diabaikan, padahal kritikal. Pelajari paralel dengan backend.",
    items: [
      { id: "se-1", label: "OWASP Top 10 (wajib paham)", yt: "owasp top 10 explained tutorial", challenge: "Pilih 3 dari OWASP Top 10, jelaskan cara serangan & mitigasinya di level kode." },
      { id: "se-2", label: "SQL Injection, XSS, CSRF, SSRF", yt: "sql injection xss csrf ssrf explained", challenge: "Buat endpoint rentan SQLi/XSS lalu perbaiki; tunjukkan kondisi sebelum & sesudah." },
      { id: "se-3", label: "Password hashing (bcrypt / argon2)", yt: "password hashing bcrypt argon2 tutorial", challenge: "Implementasikan registrasi dengan hashing argon2/bcrypt (jangan simpan plaintext)." },
      { id: "se-4", label: "Authorization: RBAC / ABAC", yt: "rbac abac authorization explained", challenge: "Implementasikan RBAC: role admin & user dengan akses endpoint berbeda." },
      { id: "se-5", label: "HTTPS/TLS, CORS, Content Security Policy", yt: "cors csp https security headers explained", challenge: "Tambahkan CORS, CSP, dan HTTPS-redirect yang benar pada app-mu." },
      { id: "se-6", label: "Secrets management & vault", yt: "secrets management vault tutorial", challenge: "Pindahkan semua secret ke secret manager/env dan pastikan tidak ada di git history." },
      { id: "se-7", label: "Input validation & sanitization", yt: "input validation sanitization security tutorial", challenge: "Tambahkan validasi & sanitasi (mis. Zod) pada semua input API." },
      { id: "se-8", label: "Dependency scanning (Dependabot, Snyk)", yt: "dependency scanning dependabot snyk tutorial", challenge: "Jalankan scan dependency (npm audit/Snyk) dan perbaiki minimal 1 kerentanan." },
    ],
    capstone: {
      id: "cap-security",
      title: "Capstone: Hardening Aplikasi",
      brief: "Amankan salah satu app yang sudah kamu buat sesuai standar OWASP.",
      criteria: [
        "Audit terhadap OWASP Top 10 + perbaiki SQLi/XSS/CSRF",
        "Password di-hash (argon2/bcrypt) + RBAC untuk otorisasi",
        "Security headers (CORS, CSP, HTTPS) terpasang benar",
        "Secret management bersih + dependency scan tanpa kerentanan kritis",
      ],
    },
  },
  {
    id: "vibe-coding",
    emoji: "🤖",
    title: "8. Vibe Coding (AI-Assisted Development)",
    blurb:
      "Mengembangkan software dengan AI sebagai partner. Hanya efektif jika fundamental sudah kuat.",
    items: [
      { id: "vc-1", label: "Mindset: AI sebagai force multiplier, bukan pengganti pemahaman", yt: "vibe coding ai assisted development explained", challenge: "Minta AI membuat 1 fitur, lalu review & temukan minimal 1 hal yang harus kamu koreksi." },
      { id: "vc-2", label: "Claude Code (CLI agentic coding)", yt: "claude code tutorial getting started", challenge: "Selesaikan 1 task nyata di repo memakai Claude Code dari awal hingga commit." },
      { id: "vc-3", label: "Cursor / GitHub Copilot / Windsurf", yt: "cursor ai code editor tutorial", challenge: "Pakai AI editor untuk refactor 1 file dan jelaskan apa saja yang berubah." },
      { id: "vc-4", label: "Prompt engineering untuk coding", yt: "prompt engineering for coding tutorial", challenge: "Tulis 1 prompt buruk & 1 prompt baik untuk task yang sama, lalu bandingkan hasilnya." },
      { id: "vc-5", label: "Context management (beri AI file relevan)", yt: "ai coding context management best practices", challenge: "Beri AI file & spesifikasi yang tepat untuk 1 fitur, lalu ukur akurasi hasilnya." },
      { id: "vc-6", label: "Memecah tugas besar & verifikasi kritis output AI", yt: "ai coding workflow breaking down tasks review", challenge: "Pecah 1 fitur besar jadi 5 langkah kecil yang masing-masing bisa diverifikasi." },
      { id: "vc-7", label: "Praktik aman: test, jangan commit secrets, waspada halusinasi", yt: "ai coding best practices security hallucination", challenge: "Tinjau output AI: tulis test yang membuktikan kodenya benar sebelum merge." },
      { id: "vc-8", label: "Integrasi LLM ke aplikasi (Claude API, function calling)", yt: "claude api function calling tutorial", challenge: "Buat endpoint yang memanggil Claude API + 1 tool/function call." },
      { id: "vc-9", label: "RAG + vector database", yt: "rag retrieval augmented generation tutorial", challenge: "Bangun mini-RAG: indeks beberapa dokumen, lalu jawab pertanyaan dari isinya." },
      { id: "vc-10", label: "AI agents & streaming responses", yt: "ai agents llm streaming tutorial", challenge: "Buat agent sederhana yang memakai 1 tool & streaming respons ke UI." },
    ],
    capstone: {
      id: "cap-vibe-coding",
      title: "Capstone: Build with AI",
      brief: "Bangun 1 fitur AI nyata end-to-end memakai AI sebagai partner, dengan verifikasi ketat.",
      criteria: [
        "Implementasi dibantu Claude Code/Cursor, tapi kamu paham tiap barisnya",
        "Integrasi LLM API + RAG atau tool/function calling",
        "Test yang membuktikan kebenaran output sebelum merge",
        "Tidak ada secret/API key yang ter-commit",
      ],
    },
  },
  {
    id: "soft-skills",
    emoji: "🧠",
    title: "9. Soft Skills & Karier",
    blurb: "Skill non-teknis yang menentukan pertumbuhan kariermu.",
    items: [
      { id: "ss-1", label: "Debugging sistematis (bukan trial-error)", yt: "systematic debugging techniques tutorial", challenge: "Ambil 1 bug nyata: tulis hipotesis, isolasi penyebab, lalu dokumentasikan prosesnya." },
      { id: "ss-2", label: "Membaca dokumentasi & belajar mandiri", yt: "how to read documentation effectively developer", challenge: "Pelajari 1 library baru hanya dari dokumentasinya, lalu buat demo kecil." },
      { id: "ss-3", label: "Komunikasi teknis & menulis dokumentasi", yt: "technical writing for developers tutorial", challenge: "Tulis README/dokumentasi teknis yang jelas untuk salah satu proyekmu." },
      { id: "ss-4", label: "Code review (memberi & menerima feedback)", yt: "code review best practices tutorial", challenge: "Lakukan code review pada sebuah PR dengan minimal 3 komentar konstruktif." },
      { id: "ss-5", label: "Agile / Scrum dasar", yt: "agile scrum explained for beginners", challenge: "Pecah sebuah fitur jadi user story + acceptance criteria di papan Kanban." },
      { id: "ss-6", label: "Membangun portofolio & kontribusi open source", yt: "developer portfolio open source contribution guide", challenge: "Publikasikan 1 proyek ke GitHub (README + demo live) dan lakukan 1 kontribusi open source." },
      { id: "ss-7", label: "Personal branding (GitHub, LinkedIn, blog)", yt: "developer personal branding github linkedin tips", challenge: "Tulis 1 post teknis (blog/LinkedIn) tentang sesuatu yang baru kamu pelajari." },
    ],
    capstone: {
      id: "cap-soft-skills",
      title: "Capstone: Showcase & Kontribusi",
      brief: "Tunjukkan kemampuan komunikasi & kolaborasimu secara publik.",
      criteria: [
        "1 proyek dengan README rapi + demo live",
        "1 kontribusi open source (PR diterima/ditinjau)",
        "1 tulisan teknis dipublikasikan",
        "Profil GitHub & LinkedIn diperbarui & profesional",
      ],
    },
  },
  {
    id: "projects",
    emoji: "💼",
    title: "10. Proyek Portofolio",
    blurb:
      "Proyek > sertifikat. Untuk tiap proyek: pakai Git, tulis test, deploy live, setup CI/CD.",
    items: [
      { id: "pr-1", label: "Task Manager / Notes App (CRUD, auth, real-time)", yt: "build fullstack task manager nextjs tutorial", challenge: "Syarat lulus: auth, CRUD penuh, update real-time, deploy live, dan README yang jelas." },
      { id: "pr-2", label: "E-commerce Mini (cart, checkout, payment, admin)", yt: "build ecommerce nextjs stripe tutorial", challenge: "Syarat lulus: katalog, cart, checkout, integrasi payment (Stripe test), dan admin dashboard." },
      { id: "pr-3", label: "Social Platform (feed, follow, like, notifications)", yt: "build social media app fullstack tutorial", challenge: "Syarat lulus: feed, follow/unfollow, like & comment, dan notifikasi real-time." },
      { id: "pr-4", label: "SaaS Dashboard (multi-tenant, subscription, RBAC)", yt: "build saas dashboard nextjs tutorial", challenge: "Syarat lulus: multi-tenant, langganan berbayar, RBAC, dan dashboard analitik." },
      { id: "pr-5", label: "AI-Powered App (LLM, chat, RAG)", yt: "build ai app rag chat nextjs tutorial", challenge: "Syarat lulus: integrasi LLM, antarmuka chat streaming, dan RAG dari dokumen." },
    ],
    capstone: {
      id: "cap-projects",
      title: "Capstone: Proyek Andalan (Flagship)",
      brief: "Gabungkan semua skill jadi satu produk full stack berkualitas produksi.",
      criteria: [
        "Full stack + autentikasi + database, ter-deploy live",
        "CI/CD aktif + ada test otomatis",
        "Aman sesuai OWASP + README/dokumentasi lengkap",
        "Bonus: ada sentuhan fitur AI yang bermanfaat",
      ],
    },
  },
];

// Total mencakup semua item + 1 capstone per section.
export const TOTAL_ITEMS = ROADMAP.reduce(
  (n, s) => n + s.items.length + 1,
  0,
);
