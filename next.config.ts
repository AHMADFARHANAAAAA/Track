import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hasilkan output mandiri (.next/standalone) agar image Docker minimal.
  output: "standalone",
};

export default nextConfig;
