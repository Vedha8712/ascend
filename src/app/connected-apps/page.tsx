import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { pet: true, studySessions: true, tasks: true },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Profile</p>
        <h1 className="text-3xl font-black text-slate-900">{user.name || user.username}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-300 text-2xl font-black text-white">
              {user.username.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{user.username}</p>
              <p className="text-slate-600">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p><strong className="text-slate-900">Academic level:</strong> {user.academicLevel || 'Not set'}</p>
            <p><strong className="text-slate-900">Timezone:</strong> {user.timezone}</p>
            <p><strong className="text-slate-900">Tasks logged:</strong> {user.tasks.length}</p>
            <p><strong className="text-slate-900">Study sessions:</strong> {user.studySessions.length}</p>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">Ember growth</h2>
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-orange-50 p-4">
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 via-amber-300 to-orange-200 shadow-ember">
              <div className="absolute left-4 top-3 h-4 w-4 rounded-full bg-white/80" />
              <div className="absolute right-4 top-3 h-4 w-4 rounded-full bg-white/80" />
              <div className="absolute left-1/2 top-1/2 h-8 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[40%] border-4 border-orange-700 bg-gradient-to-b from-orange-500 to-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Level {user.pet?.level || 1}</p>
              <h3 className="text-2xl font-bold text-slate-900">{user.pet?.name || 'Ember'}</h3>
              <p className="text-sm text-slate-600">Mood: {user.pet?.mood || 'Happy'}</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm text-slate-600">
              <span>Progress</span>
              <span>{user.pet?.xp || 0} XP</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-orange-100">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
