import './globals.css';
import { getServerSession } from 'next-auth';
import { Providers } from '@/components/Providers';
import { Sidebar } from '@/components/Sidebar';
import { authOptions } from '@/lib/auth';

export const metadata = {
  title: 'Ascend',
  description: 'Ascend helps students organize study, routines, goals, and growth.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="page-shell">
            <Sidebar session={session} />
            <main className="min-h-screen w-full p-4 md:p-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
