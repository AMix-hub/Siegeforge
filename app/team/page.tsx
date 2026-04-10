import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Team – SiegeForge',
  description: 'Meet the team behind SiegeForge, the Hero Siege build archive.',
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: string;
  color: { bg: string; border: string; text: string; glow: string };
  socials?: { label: string; href: string }[];
}

const TEAM: TeamMember[] = [
  {
    name: 'AMix',
    role: 'Founder & Developer',
    bio: 'Passionate Hero Siege player and builder. Created SiegeForge to give the community a home for sharing builds, strategies, and knowledge.',
    icon: '⚔',
    color: {
      bg: 'rgba(180,83,9,0.12)',
      border: 'rgba(180,83,9,0.35)',
      text: '#fcd34d',
      glow: 'rgba(180,83,9,0.18)',
    },
  },
  // Add more team members below – copy the block above and fill in the details.
];

function MemberCard({ member }: { member: TeamMember }) {
  const { name, role, bio, icon, color, socials } = member;
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(145deg, ${color.bg} 0%, rgba(6,6,14,0.98) 100%)`,
        border: `1px solid ${color.border}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 40px ${color.glow}`,
      }}
    >
      {/* Hover overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 40% 20%, ${color.glow} 0%, transparent 60%)` }}
      />

      {/* Avatar */}
      <div className="relative mb-5 flex items-center gap-4">
        <span
          className="flex items-center justify-center w-14 h-14 rounded-2xl text-3xl flex-shrink-0"
          style={{ background: color.bg, border: `1px solid ${color.border}` }}
        >
          {icon}
        </span>
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: color.text }}>
            {name}
          </h2>
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-slate-500 mt-0.5">
            {role}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-slate-400 leading-relaxed flex-1">{bio}</p>

      {/* Socials */}
      {socials && socials.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/[0.06]">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full transition-all hover:opacity-80"
              style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #b45309 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase text-slate-600 mb-8">
          <Link href="/" className="hover:text-slate-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-violet-500">The Team</span>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.3em] uppercase mb-6"
          style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.28)', color: '#c4b5fd' }}
        >
          🛡 The People Behind SiegeForge
        </div>

        <h1
          className="text-5xl md:text-7xl font-black uppercase tracking-[0.1em] mb-5"
          style={{
            background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #ddd6fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
          }}
        >
          The Team
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
          A small group of Hero Siege enthusiasts who wanted to give the community
          a proper home for builds, guides, and shared knowledge.
        </p>
      </section>

      {/* ── Team grid ── */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        {TEAM.length === 0 ? (
          <div className="text-center py-24 text-slate-600">
            <p className="text-5xl mb-5">🛡</p>
            <p className="text-lg tracking-wider">Team introductions coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TEAM.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
