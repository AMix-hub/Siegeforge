import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
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
      <body className="min-h-full flex flex-col bg-[#0b0e11] text-slate-200">

        {/* ── Vignette overlay ── */}
        <div className="vignette" aria-hidden="true" />

        {/* ── Global navbar ── */}
        <Navbar />

        {/* Spacer to offset fixed navbar */}
        <div className="h-[56px] flex-shrink-0" />

        <main className="flex-1 relative z-10">{children}</main>

        <footer className="relative z-10 border-t border-amber-900/20 py-5 text-center text-xs text-slate-600">
          SiegeForge &copy; {new Date().getFullYear()} &mdash; Fan-made. Not affiliated with Hero Siege.
        </footer>
      </body>
    </html>
  );
}
