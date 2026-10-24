export function StatCard({ label, value, meta }: { label: string; value: string; meta: string }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black text-slate-900">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-orange-500">{meta}</p>
    </div>
  );
}
