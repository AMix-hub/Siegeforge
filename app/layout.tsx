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
        <header className="border-b border-amber-900/40 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-amber-500 text-2xl">⚔</span>
              <span className="text-xl font-bold tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors">
                SiegeForge
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-slate-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Builds
              </Link>
              <span className="text-slate-700">|</span>
              <span className="text-slate-600 cursor-not-allowed" title="Coming soon">
                Items
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
