'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/builds/featured', label: 'Featured', icon: '✦' },
  { href: '/builds/community', label: 'Browse Builds', icon: '⚔' },
  { href: '/team', label: 'The Team', icon: '🛡' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-amber-900/20 bg-slate-950/80 backdrop-blur-sm shadow-lg shadow-black/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group select-none min-w-0"
          >
            <span
              className="text-2xl leading-none flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
              style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.5))' }}
            >
              ⚔
            </span>
            <span
              className="text-xl font-black tracking-[0.22em] uppercase text-gradient-gold truncate logo-pulse"
              style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
            >
              SiegeForge
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase">
            {NAV_LINKS.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  pathname === href || pathname.startsWith(href)
                    ? 'active text-amber-400'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </Link>
            ))}
            <span className="text-white/10 mx-1">|</span>
            <Link
              href="/builds/community"
              className="btn-forge ml-1"
            >
              + Create Build
            </Link>
          </nav>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-amber-900/40 bg-amber-950/20 transition-colors hover:bg-amber-950/40"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block w-5 h-0.5 bg-amber-400/80 transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-amber-400/80 transition-all duration-200 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-amber-400/80 transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        {open && (
          <div
            className="md:hidden border-t border-amber-900/20 bg-slate-950/95 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 text-[12px] font-semibold tracking-widest uppercase">
              {NAV_LINKS.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${
                    pathname === href || pathname.startsWith(href)
                      ? 'text-amber-400 bg-amber-950/30'
                      : 'text-slate-400 hover:text-amber-300 hover:bg-amber-950/20'
                  }`}
                >
                  <span className="text-lg leading-none">{icon}</span>
                  {label}
                </Link>
              ))}
              <div className="border-t border-amber-900/20 my-1" />
              <Link
                href="/builds/community"
                className="btn-forge justify-center mx-4 my-1"
                onClick={() => setOpen(false)}
              >
                + Create Build
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
