#!/usr/bin/env bash
#
# Redeploy learning-tracker ke Droplet.
# Jalankan DI DROPLET dari root repo:
#   bash deploy/redeploy.sh
#
# Skrip ini: tarik kode terbaru -> build ulang image Docker -> ganti container.
# Volume `lt-data` dipertahankan, jadi progres semua user TIDAK hilang.
# Nginx + sertifikat HTTPS tidak disentuh (sudah permanen).

set -euo pipefail

IMAGE="learning-tracker"
CONTAINER="learning-tracker"
DATA_VOLUME="lt-data"
BRANCH="main"

echo "==> 1/4 Menarik kode terbaru (git pull origin ${BRANCH})"
git pull origin "${BRANCH}"

echo "==> 2/4 Build ulang image Docker (${IMAGE})"
docker build -t "${IMAGE}" .

echo "==> 3/4 Mengganti container lama"
# `|| true` agar tidak gagal bila container belum ada (deploy pertama).
docker stop "${CONTAINER}" 2>/dev/null || true
docker rm "${CONTAINER}" 2>/dev/null || true

docker run -d \
  --name "${CONTAINER}" \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -v "${DATA_VOLUME}:/app/data" \
  "${IMAGE}"

echo "==> 4/4 Status container"
docker ps --filter "name=${CONTAINER}"

echo
echo "Selesai. Buka: https://159.89.207.8.sslip.io/learning-tracker"
echo "Cek log:  docker logs -f ${CONTAINER}"
