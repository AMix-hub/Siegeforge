'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/builds/featured', label: 'Featured', icon: '✦', colorClass: 'text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-950/40' },
  { href: '/builds/community', label: 'Community', icon: '⚔', colorClass: 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-950/40' },
  { href: '/team', label: 'The Team', icon: '🛡', colorClass: 'text-violet-400/80 hover:text-violet-300 hover:bg-violet-950/40' },
];

const DISABLED_LINKS = [
  { label: 'Items' },
  { label: 'Classes' },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop nav (md+) ── */}
      <nav className="hidden md:flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase">
        {NAV_LINKS.map(({ href, label, icon, colorClass }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${colorClass} ${pathname === href ? 'opacity-100' : ''}`}
          >
            <span className="text-base leading-none">{icon}</span> {label}
          </Link>
        ))}
        <span className="text-white/10">|</span>
        {DISABLED_LINKS.map(({ label }) => (
          <span key={label} className="px-3 py-1.5 text-slate-700 cursor-not-allowed" title="Coming soon">
            {label}
          </span>
        ))}
      </nav>

      {/* ── Hamburger button (mobile) ── */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          className="md:hidden absolute top-full left-0 right-0 z-50 border-b border-white/[0.06] bg-[#06060e]/95 backdrop-blur-xl shadow-2xl shadow-black/60"
          onClick={() => setOpen(false)}
        >
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 text-[12px] font-semibold tracking-widest uppercase">
            {NAV_LINKS.map(({ href, label, icon, colorClass }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${colorClass}`}
              >
                <span className="text-lg leading-none">{icon}</span> {label}
              </Link>
            ))}
            <div className="border-t border-white/[0.06] my-1" />
            {DISABLED_LINKS.map(({ label }) => (
              <span key={label} className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-slate-700 cursor-not-allowed">
                {label} <span className="text-[9px] tracking-widest normal-case font-normal text-slate-700/60">– coming soon</span>
              </span>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
