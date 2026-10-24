import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function StudyPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { studySessions: { orderBy: { createdAt: 'desc' }, take: 10 } },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Study tracker</p>
        <h1 className="text-3xl font-black text-slate-900">Focus and momentum</h1>
      </div>

      <section className="card p-6">
        <h2 className="text-xl font-bold text-slate-900">Log a study session</h2>
        <form action="/api/study-sessions" method="post" className="mt-5 grid gap-4 md:grid-cols-2">
          <input className="input" name="subject" placeholder="Subject" required />
          <input className="input" name="topic" placeholder="Topic" />
          <input className="input" type="number" name="durationMinutes" placeholder="Minutes" min={15} max={600} required />
          <input className="input" type="number" name="plannedMinutes" placeholder="Planned minutes" min={15} max={600} />
          <textarea className="input md:col-span-2" name="notes" rows={3} placeholder="What did you focus on?" />
          <div className="md:col-span-2">
            <button className="btn-primary" type="submit">Save session</button>
          </div>
        </form>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-bold text-slate-900">Recent sessions</h2>
        <div className="mt-4 space-y-3">
          {user.studySessions.length > 0 ? (
            user.studySessions.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{item.subject}</p>
                  <p className="text-sm text-slate-500">{item.topic || 'General study'} • {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">{item.durationMinutes}m</p>
                  <p className="text-xs text-slate-500">logged</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No sessions recorded yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
