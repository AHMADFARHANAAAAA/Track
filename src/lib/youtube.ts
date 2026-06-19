/** Bangun URL pencarian YouTube dari query terkurasi (materi bahasa Indonesia). */
export function ytSearchUrl(query: string): string {
  const q = `${query} bahasa indonesia`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}
