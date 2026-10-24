import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const subject = String(formData.get('subject') || '').trim();
  const priority = String(formData.get('priority') || 'MEDIUM');
  const dueDateValue = formData.get('dueDate');

  if (!title) {
    return NextResponse.json({ error: 'Task title is required.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }

  const task = await prisma.task.create({
    data: {
      userId: user.id,
      title,
      description: description || null,
      subject: subject || null,
      priority: priority as any,
      dueDate: dueDateValue ? new Date(String(dueDateValue)) : null,
      status: 'TODO',
    },
  });

  return NextResponse.redirect(new URL('/tasks', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}
