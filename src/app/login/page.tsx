import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { StatCard } from '@/components/StatCard';

const formatDate = (value: Date | null) =>
  value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(value) : '—';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      tasks: {
        orderBy: { dueDate: 'asc' },
        take: 5,
      },
      studySessions: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      pet: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  const completedToday = user.studySessions.filter((item) => {
    const now = new Date();
    const day = new Date(item.createdAt);
    return day.toDateString() === now.toDateString();
  }).reduce((sum, item) => sum + item.durationMinutes, 0);

  const priorityTasks = user.tasks.filter((task) => task.status !== 'COMPLETED').slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Dashboard</p>
          <h1 className="text-3xl font-black text-slate-900">Welcome back, {user.name || user.username}.</h1>
        </div>
        <div className="badge">Ember is thriving</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Study today" value={`${completedToday} min`} meta="focus time logged" />
        <StatCard label="Open tasks" value={String(user.tasks.filter((task) => task.status !== 'COMPLETED').length)} meta="needs attention" />
        <StatCard label="Current streak" value="12 days" meta="study consistency" />
        <StatCard label="XP" value="2,480" meta="level 8" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Today’s priorities</h2>
            <span className="text-sm text-slate-500">{priorityTasks.length} items</span>
          </div>

          <div className="mt-5 space-y-3">
            {priorityTasks.length > 0 ? (
              priorityTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50 p-4">
                  <div>
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-sm text-slate-500">Due {formatDate(task.dueDate)} • {task.priority}</p>
                  </div>
                  <span className="badge">{task.status}</span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
                No urgent tasks today. Add a goal or schedule a study block to keep momentum alive.
              </div>
            )}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">Ember the fox</h2>
          <div className="mt-4 flex items-center gap-6 rounded-2xl bg-gradient-to-br from-orange-100 via-amber-100 to-orange-50 p-5">
            <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-orange-500 via-amber-300 to-orange-200 shadow-ember">
              <div className="absolute left-5 top-3 h-5 w-5 rounded-full bg-white/85" />
              <div className="absolute right-5 top-3 h-5 w-5 rounded-full bg-white/85" />
              <div className="absolute left-7 top-7 h-2 w-2 rounded-full bg-slate-900" />
              <div className="absolute right-7 top-7 h-2 w-2 rounded-full bg-slate-900" />
              <div className="absolute left-1/2 top-1/2 h-10 w-12 -translate-x-1/2 -translate-y-1/2 rounded-[40%] border-4 border-orange-700 bg-gradient-to-b from-orange-500 to-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Level {user.pet?.level || 1}</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">{user.pet?.name || 'Ember'}</h3>
              <p className="text-sm text-slate-600">{user.pet?.mood || 'Happy'} and ready for the next victory.</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
              <span>Growth</span>
              <span>{user.pet?.xp || 0} XP</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-orange-100">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
            </div>
          </div>
        </section>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">Recent study sessions</h2>
          <div className="mt-4 space-y-3">
            {user.studySessions.length > 0 ? (
              user.studySessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3">
                  <div>
                    <p className="font-medium text-slate-800">{session.subject}</p>
                    <p className="text-sm text-slate-500">{session.topic || 'General review'} • {formatDate(new Date(session.createdAt))}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{session.durationMinutes} min</p>
                    <p className="text-xs text-slate-500">focus</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No study sessions logged yet. Start a focused session to build momentum.</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">Weekly challenge</h2>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-orange-200">This week</p>
            <h3 className="mt-2 text-2xl font-bold">Finish 3 deep study blocks</h3>
            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-orange-400 to-amber-300" />
            </div>
            <p className="mt-3 text-sm text-slate-200">62% complete • reward: +120 XP</p>
          </div>
        </div>
      </section>
    </div>
  );
}
