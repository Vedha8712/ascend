import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get('name') || '').trim();
  const username = String(formData.get('username') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const academicLevel = String(formData.get('academicLevel') || 'Other');

  if (!name || !username || !email || password.length < 8) {
    return NextResponse.json({ error: 'Please provide valid registration details.' }, { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'An account with that email or username already exists.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      passwordHash,
      academicLevel,
    },
  });

  await prisma.pet.create({
    data: {
      userId: user.id,
      name: 'Ember',
      stage: 'Cub',
      mood: 'Happy',
      xp: 0,
      level: 1,
    },
  });

  return NextResponse.redirect(new URL('/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}
