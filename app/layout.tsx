import type { Metadata } from 'next';
import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import './globals.css';

export const metadata: Metadata = {
  title: 'SiegeForge – Hero Siege Build Sharing',
  description: 'Share and discover Hero Siege builds with your community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#06060e] text-slate-200">

        {/* ── Global nav ── */}
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06060e]/90 backdrop-blur-xl shadow-2xl shadow-black/60">
          <div className="relative max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group select-none min-w-0">
              <span className="text-2xl leading-none flex-shrink-0">⚔</span>
              <span
                className="text-xl font-bold tracking-[0.22em] uppercase text-gradient-gold group-hover:opacity-90 transition-opacity truncate"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                SiegeForge
              </span>
            </Link>

            {/* Nav (desktop) + hamburger (mobile) */}
            <NavMenu />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-white/[0.05] py-5 text-center text-xs text-slate-600">
          SiegeForge &copy; {new Date().getFullYear()} &mdash; Fan-made. Not affiliated with Hero Siege.
        </footer>
      </body>
    </html>
  );
}
