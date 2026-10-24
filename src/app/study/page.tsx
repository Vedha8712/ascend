import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { tasks: { orderBy: { createdAt: 'desc' } } },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Tasks</p>
          <h1 className="text-3xl font-black text-slate-900">Task management</h1>
        </div>
        <span className="badge">{user.tasks.length} tracked items</span>
      </div>

      <section className="card p-6">
        <h2 className="text-xl font-bold text-slate-900">Create a task</h2>
        <form action="/api/tasks" method="post" className="mt-5 grid gap-4 md:grid-cols-2">
          <input className="input" name="title" placeholder="Task title" required />
          <select className="input" name="priority">
            <option value="LOW">Low priority</option>
            <option value="MEDIUM" selected>Medium priority</option>
            <option value="HIGH">High priority</option>
          </select>
          <input className="input" name="subject" placeholder="Subject or category" />
          <input className="input" type="date" name="dueDate" />
          <textarea className="input md:col-span-2" name="description" rows={3} placeholder="Notes, links, or context" />
          <div className="md:col-span-2">
            <button className="btn-primary" type="submit">Add task</button>
          </div>
        </form>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-bold text-slate-900">Task list</h2>
        <div className="mt-5 space-y-3">
          {user.tasks.length > 0 ? (
            user.tasks.map((task) => (
              <div key={task.id} className="flex flex-col gap-2 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <p className="text-sm text-slate-600">{task.subject || 'General'} • {task.priority}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge">{task.status}</span>
                  <span className="text-sm text-slate-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No deadline'}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">You have not created any tasks yet. Start with one important next step.</p>
          )}
        </div>
      </section>
    </div>
  );
}
