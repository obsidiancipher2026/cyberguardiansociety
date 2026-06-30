'use client';

import {
  forwardRef,
  useEffect,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

interface PreviewLinkCardProps {
  children: ReactNode;
  href: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  followCursor?: boolean | 'x' | 'y';
  gravity?: number;
}

let injected = false;

function injectKeyframes() {
  if (typeof document === 'undefined' || injected) return;
  injected = true;
  const el = document.createElement('style');
  el.textContent = `
@keyframes plc-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
`;
  document.head.appendChild(el);
}

function PreviewLinkCard({
  children,
  href,
  side = 'top',
  sideOffset = 8,
  align = 'center',
  alignOffset = 0,
  followCursor = false,
  gravity = 0,
}: PreviewLinkCardProps) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  return (
    <HoverCardPrimitive.Root openDelay={300} closeDelay={200}>
      <HoverCardPrimitive.Trigger asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          className="z-50 w-96 rounded-xl border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--surface-raised,#1a1a2e)] p-2 shadow-xl overflow-hidden"
          asChild
        >
          <div style={{ animation: 'plc-in 0.2s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <PreviewLinkCardImage href={href} />
            <div className="p-2">
              <p className="text-xs text-[var(--text-secondary,#a0a0b0)] truncate">
                {href}
              </p>
            </div>
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}

interface PreviewLinkCardTriggerProps {
  children: ReactNode;
  href: string;
  className?: string;
}

function PreviewLinkCardTrigger({
  children,
  href,
  className = '',
}: PreviewLinkCardTriggerProps) {
  return (
    <HoverCardPrimitive.Trigger asChild>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[var(--cyan-core,#06b6d4)] hover:underline underline-offset-4 ${className}`}
      >
        {children}
      </a>
    </HoverCardPrimitive.Trigger>
  );
}

interface PreviewLinkCardPortalProps {
  children: ReactNode;
}

function PreviewLinkCardPortal({ children }: PreviewLinkCardPortalProps) {
  return <HoverCardPrimitive.Portal>{children}</HoverCardPrimitive.Portal>;
}

interface PreviewLinkCardContentProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  children: ReactNode;
  transitionDuration?: number;
}

const PreviewLinkCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  PreviewLinkCardContentProps
>(
  (
    {
      children,
      side = 'top',
      sideOffset = 8,
      align = 'center',
      alignOffset = 0,
      transitionDuration = 0.2,
      className = '',
      ...props
    },
    ref
  ) => (
    <HoverCardPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={`z-50 w-96 rounded-xl border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--surface-raised,#1a1a2e)] p-2 shadow-xl overflow-hidden ${className}`}
      asChild
      {...props}
    >
      <div
        style={{
          animation: `plc-in ${transitionDuration}s cubic-bezier(0.16,1,0.3,1) forwards`,
        }}
      >
        {children}
      </div>
    </HoverCardPrimitive.Content>
  )
);

PreviewLinkCardContent.displayName = 'PreviewLinkCardContent';

interface PreviewLinkCardImageProps {
  href: string;
  className?: string;
}

function PreviewLinkCardImage({
  href,
  className = '',
}: PreviewLinkCardImageProps) {
  return (
    <div
      className={`relative w-full h-48 rounded-lg overflow-hidden bg-[var(--surface-base,#0d0d1a)] ${className}`}
    >
      <iframe
        src={href}
        title="Preview"
        className="w-full h-full border-0 pointer-events-none"
        loading="lazy"
        sandbox="allow-same-origin"
        style={{
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
          width: '200%',
          height: '200%',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-raised,#1a1a2e)] via-transparent to-transparent" />
    </div>
  );
}

export {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardPortal,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
};

export type {
  PreviewLinkCardProps,
  PreviewLinkCardTriggerProps,
  PreviewLinkCardPortalProps,
  PreviewLinkCardContentProps,
  PreviewLinkCardImageProps,
};
