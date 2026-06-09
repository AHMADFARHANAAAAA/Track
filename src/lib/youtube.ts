export type Lang = "en" | "id";

/** Bangun URL pencarian YouTube dari query terkurasi + preferensi bahasa. */
export function ytSearchUrl(query: string, lang: Lang): string {
  const q = lang === "id" ? `${query} bahasa indonesia` : query;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}
