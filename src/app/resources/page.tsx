export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-500">About</p>
        <h1 className="text-3xl font-black text-slate-900">A calmer way to grow</h1>
      </div>

      <article className="card p-8 leading-7 text-slate-700">
        <p>
          Ascend was created to help students build sustainable habits, plan realistically, and feel more in control of their academic and personal progress.
        </p>
        <p className="mt-4">
          The goal is not to optimize students into exhaustion. Instead, Ascend focuses on consistency, reflection, progress, and balance — with healthy study rhythms, task clarity, and meaningful rewards.
        </p>
        <p className="mt-4">
          Ember, the fox companion, embodies that philosophy: steady, warm, and encouraging. Growth is built on real effort, not perfection.
        </p>
      </article>
    </div>
  );
}
