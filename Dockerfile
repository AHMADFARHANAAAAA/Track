# syntax=docker/dockerfile:1

# ---- Tahap 1: install dependency ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Tahap 2: build aplikasi ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Subpath tempat app dilayani Nginx. Di-inline saat build (tidak bisa diubah
# tanpa rebuild). Override: docker build --build-arg NEXT_PUBLIC_BASE_PATH=/lain
ARG NEXT_PUBLIC_BASE_PATH=/learning-tracker
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
RUN npm run build

# ---- Tahap 3: runtime produksi ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Jalankan sebagai user non-root.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Salin output standalone + aset statis.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Folder progres bersama. Dimiliki user non-root agar bisa ditulis,
# dan diisi oleh volume saat runtime supaya progres awet antar-rebuild.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data
ENV DATA_DIR=/app/data
VOLUME /app/data

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
