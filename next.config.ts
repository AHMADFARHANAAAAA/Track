import type { NextConfig } from "next";

// Prefix subpath, di-set saat build lewat env (di-inline ke bundle klien).
// Kosong di lokal → app di root. Di Docker di-isi "/learning-tracker".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Hasilkan output mandiri (.next/standalone) agar image Docker minimal.
  output: "standalone",
  basePath: basePath || undefined,
};

export default nextConfig;
