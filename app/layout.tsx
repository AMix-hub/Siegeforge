import type { Metadata } from 'next';
import Link from 'next/link';
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
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <span className="text-2xl leading-none">⚔</span>
              <span
                className="text-xl font-bold tracking-[0.22em] uppercase text-gradient-gold group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                SiegeForge
              </span>
            </Link>

            {/* Nav links */}
            <nav className="flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase">
              <Link
                href="/builds/featured"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-950/40 transition-all"
              >
                <span className="text-base leading-none">✦</span> Featured
              </Link>
              <span className="text-white/10">|</span>
              <Link
                href="/builds/community"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-amber-400/80 hover:text-amber-300 hover:bg-amber-950/40 transition-all"
              >
                <span className="text-base leading-none">⚔</span> Community
              </Link>
              <span className="text-white/10">|</span>
              <span className="px-3 py-1.5 text-slate-700 cursor-not-allowed" title="Coming soon">Items</span>
              <span className="text-white/10">|</span>
              <span className="px-3 py-1.5 text-slate-700 cursor-not-allowed" title="Coming soon">Classes</span>
            </nav>
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
