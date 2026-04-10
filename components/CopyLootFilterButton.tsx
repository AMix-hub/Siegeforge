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
        className="btn-forge"
      >
        {copied ? '✓ Copied!' : 'Copy Filter'}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`btn-forge ${copied ? '!border-green-600/60 !text-green-300' : ''}`}
    >
      <span>{copied ? '✓' : '📋'}</span>
      {copied ? 'Loot Filter Copied!' : 'Copy Loot Filter'}
    </button>
  );
}
