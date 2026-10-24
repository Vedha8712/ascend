import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center py-12">
      <div className="card p-8">
        <div className="mb-8 text-center">
          <span className="badge">Ascend</span>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">Log in to continue your personal growth journey.</p>
        </div>

        <form action="/api/auth/callback/credentials" method="post" className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
            <input className="input" type="email" name="email" placeholder="hello@ascend.app" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
            <input className="input" type="password" name="password" placeholder="••••••••" required />
          </div>
          <button className="btn-primary w-full" type="submit">Log in</button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Need an account?{' '}
          <Link href="/register" className="font-bold text-orange-600">Create one</Link>
        </p>
      </div>
    </div>
  );
}
