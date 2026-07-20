export default function StatCard({
  label,
  value,
  sub,
  accent = "gold",
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "gold" | "red";
}) {
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden hover:-translate-y-1 transition">
      <div className="text-[12.5px] text-white/50 mb-2">{label}</div>
      <div
        className={`font-display text-2xl font-extrabold ${
          accent === "gold" ? "text-goldsoft" : "text-red-400"
        }`}
      >
        {value}
      </div>
      {sub && <div className="text-[11.5px] text-white/40 mt-1.5">{sub}</div>}
    </div>
  );
}
