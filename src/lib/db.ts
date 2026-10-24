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
  const subject = String(formData.get('subject') || '').trim();
  const topic = String(formData.get('topic') || '').trim();
  const durationMinutes = Number(formData.get('durationMinutes') || 0);
  const plannedMinutes = Number(formData.get('plannedMinutes') || 0);
  const notes = String(formData.get('notes') || '').trim();

  if (!subject || durationMinutes <= 0) {
    return NextResponse.json({ error: 'Subject and valid duration are required.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }

  await prisma.studySession.create({
    data: {
      userId: user.id,
      subject,
      topic: topic || null,
      durationMinutes,
      plannedMinutes: plannedMinutes || null,
      notes: notes || null,
    },
  });

  return NextResponse.redirect(new URL('/study', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}
