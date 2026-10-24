'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, BriefcaseBusiness, Flame, Home, LogOut, PlusCircle, ShieldCheck, Sparkles, Users } from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/tasks', label: 'Tasks', icon: PlusCircle },
  { href: '/study', label: 'Study', icon: BookOpen },
  { href: '/profile', label: 'Profile', icon: Sparkles },
  { href: '/connected-apps', label: 'Connected apps', icon: ShieldCheck },
  { href: '/about', label: 'About', icon: Users },
  { href: '/resources', label: 'Resources', icon: BriefcaseBusiness },
  { href: '/feedback', label: 'Feedback', icon: BarChart3 },
  { href: '/volunteer', label: 'Volunteer', icon: Flame },
];

export function Sidebar({ session }: { session: any }) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-lg font-black text-white shadow-ember">
          A
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-orange-500">Ascend</p>
          <h2 className="text-lg font-black text-slate-900">Ember</h2>
        </div>
      </div>

      <nav>
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={pathname === href ? 'active' : ''}>
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
        {session?.user ? (
          <>
            <p className="text-sm text-slate-500">Signed in as</p>
            <p className="mt-1 font-bold text-slate-900">{session.user.name || session.user.email}</p>
            <form action="/api/auth/signout" method="post" className="mt-4">
              <button type="submit" className="btn-secondary flex w-full items-center justify-center gap-2">
                <LogOut size={16} />
                Sign out
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-2">
            <Link href="/login" className="btn-primary block text-center no-underline">Log in</Link>
            <Link href="/register" className="btn-secondary block text-center no-underline">Register</Link>
          </div>
        )}
      </div>
    </aside>
  );
}
