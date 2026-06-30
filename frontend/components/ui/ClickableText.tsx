import React from 'react';

function renderClickableText(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s<>"')\]]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[0];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--cyan-core)] hover:underline underline-offset-2 transition-colors"
      >
        {url}
      </a>
    );
    lastIndex = urlRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

interface ClickableTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ClickableText({ text, className = '', style }: ClickableTextProps) {
  return (
    <span className={className} style={style}>
      {renderClickableText(text)}
    </span>
  );
}
