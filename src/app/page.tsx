import Link from 'next/link';

const metrics = [
  { label: 'Tasks organized', value: '2.4k+' },
  { label: 'Study streaks', value: '89%' },
  { label: 'Goals supported', value: '1.1k' },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="card overflow-hidden p-8 md:p-12">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <span className="badge">Ascend <span className="ml-2 text-xs font-medium">Ember fox edition</span></span>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Rise through your semester with clarity and consistency.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Ascend gives students one calm system for tasks, study sessions, goals, academic planning,
              habits, and personal growth — all centered around a motivating fox companion named Ember.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary inline-block no-underline">Create account</Link>
              <Link href="/login" className="btn-secondary inline-block no-underline">Log in</Link>
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-orange-100 to-amber-100 p-6">
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Ember</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">Level 8 Fox</h3>
                </div>
                <div className="rounded-full bg-orange-500 px-3 py-2 text-sm font-bold text-white">+72 XP</div>
              </div>
              <div className="mt-8 flex justify-center">
                <div className="relative h-40 w-40 rounded-full bg-gradient-to-br from-orange-400 via-amber-300 to-orange-200 shadow-ember">
                  <div className="absolute left-12 top-4 h-8 w-8 rounded-full bg-white/80" />
                  <div className="absolute right-12 top-4 h-8 w-8 rounded-full bg-white/80" />
                  <div className="absolute left-14 top-10 h-3 w-3 rounded-full bg-slate-900" />
                  <div className="absolute right-14 top-10 h-3 w-3 rounded-full bg-slate-900" />
                  <div className="absolute left-1/2 top-1/2 h-14 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[40%] border-4 border-orange-600 bg-gradient-to-b from-orange-500 to-amber-400" />
                  <div className="absolute left-5 top-16 h-10 w-7 rounded-full border-4 border-orange-600 bg-orange-500" />
                  <div className="absolute right-5 top-16 h-10 w-7 rounded-full border-4 border-orange-600 bg-orange-500" />
                  <div className="absolute left-1/2 top-20 h-10 w-4 -translate-x-1/2 bg-orange-800" />
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                  <span>Growth</span>
                  <span>76%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-orange-100">
                  <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="card p-6">
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Plan smarter',
            text: 'Build realistic study blocks, prioritize deadlines, and protect your focus with a daily planning workflow.',
          },
          {
            title: 'Track momentum',
            text: 'Log study sessions, monitor streaks and XP, and keep your virtual companion growing with every real win.',
          },
          {
            title: 'Stay balanced',
            text: 'Balance academics, personal goals, reflection, and healthy routines without burnout.',
          },
        ].map((item) => (
          <div key={item.title} className="card p-6">
            <div className="mb-4 h-11 w-11 rounded-2xl bg-orange-100 flex items-center justify-center text-xl">✦</div>
            <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
