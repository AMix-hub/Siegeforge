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
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200">
        {/* Global nav */}
        <header className="border-b border-amber-900/50 bg-slate-950/95 backdrop-blur sticky top-0 z-50 shadow-lg shadow-black/40">
          <div className="max-w-5xl mx-auto px-4 pt-4 pb-3 flex flex-col items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group select-none">
              <span className="text-amber-600 text-2xl group-hover:text-amber-400 transition-colors">⚔</span>
              <span className="text-2xl font-bold tracking-[0.25em] text-amber-400 group-hover:text-amber-300 transition-colors uppercase">
                SiegeForge
              </span>
              <span className="text-amber-600 text-2xl group-hover:text-amber-400 transition-colors">⚔</span>
            </Link>

            {/* Decorative rule */}
            <div className="flex items-center gap-3 w-full max-w-xs">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-900/60" />
              <span className="text-amber-800 text-xs">◆</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-900/60" />
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-6 text-xs font-medium tracking-widest uppercase text-slate-500">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Builds
              </Link>
              <span className="text-amber-900/60">◆</span>
              <span className="text-slate-700 cursor-not-allowed" title="Coming soon">
                Items
              </span>
              <span className="text-amber-900/60">◆</span>
              <span className="text-slate-700 cursor-not-allowed" title="Coming soon">
                Classes
              </span>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-amber-900/20 py-4 text-center text-xs text-slate-600">
          SiegeForge &copy; {new Date().getFullYear()} &mdash; Fan-made. Not affiliated with Hero Siege.
        </footer>
      </body>
    </html>
  );
}
