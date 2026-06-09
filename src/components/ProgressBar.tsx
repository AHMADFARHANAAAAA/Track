type Props = {
  value: number; // jumlah selesai
  total: number;
  label?: string;
  size?: "lg" | "sm";
};

export default function ProgressBar({ value, total, label, size = "sm" }: Props) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  const big = size === "lg";

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className={big ? "font-semibold text-slate-200" : "text-slate-400"}>
          {label ?? "Progress"}
        </span>
        <span className="tabular-nums font-medium text-slate-300">
          {value}/{total} <span className="text-slate-500">({pct}%)</span>
        </span>
      </div>
      <div
        className={`w-full overflow-hidden rounded-full bg-slate-800 ${big ? "h-3" : "h-2"}`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
