'use client';

import { useState } from 'react';

interface CopyLootFilterButtonProps {
  lootFilter: string;
  compact?: boolean;
}

export default function CopyLootFilterButton({
  lootFilter,
  compact = false,
}: CopyLootFilterButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lootFilter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = lootFilter;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleCopy}
        className="text-xs px-3 py-1 rounded-lg bg-amber-900/30 border border-amber-700/50 text-amber-400 hover:bg-amber-800/40 hover:text-amber-300 transition-all"
      >
        {copied ? '✓ Copied!' : 'Copy Filter'}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={[
        'flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm',
        'border transition-all duration-200',
        copied
          ? 'bg-green-900/40 border-green-600/60 text-green-300'
          : 'bg-amber-900/30 border-amber-700/50 text-amber-300 hover:bg-amber-800/40 hover:border-amber-600/70',
      ].join(' ')}
    >
      <span>{copied ? '✓' : '📋'}</span>
      {copied ? 'Loot Filter Copied!' : 'Copy Loot Filter'}
    </button>
  );
}
