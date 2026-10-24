import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col justify-center py-12">
      <div className="card p-8">
        <div className="mb-8 text-center">
          <span className="badge">Create account</span>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Start ascending</h1>
          <p className="mt-2 text-slate-600">Build a calmer, stronger academic routine with Ember by your side.</p>
        </div>

        <form action="/api/auth/register" method="post" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
              <input className="input" type="text" name="name" placeholder="Alex Student" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Username</label>
              <input className="input" type="text" name="username" placeholder="alexstudies" required />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
            <input className="input" type="email" name="email" placeholder="alex@example.com" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
            <input className="input" type="password" name="password" placeholder="At least 8 characters" minLength={8} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Academic level</label>
            <select className="input" name="academicLevel">
              <option value="Undergraduate">Undergraduate</option>
              <option value="A-level">A-level</option>
              <option value="GCSE">GCSE</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button className="btn-primary w-full" type="submit">Create account</button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-orange-600">Log in</Link>
        </p>
      </div>
    </div>
  );
}
