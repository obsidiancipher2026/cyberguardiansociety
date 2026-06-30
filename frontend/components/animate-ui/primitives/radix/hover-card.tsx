'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardPortal = HoverCardPrimitive.Portal;

interface HoverCardContentProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  children: ReactNode;
  followCursor?: boolean | 'x' | 'y';
  transitionDuration?: number;
}

let injected = false;

function injectKeyframes() {
  if (typeof document === 'undefined' || injected) return;
  injected = true;
  const el = document.createElement('style');
  el.textContent = `
@keyframes hc-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
@keyframes hc-in-right { from { opacity: 0; transform: scale(0.96) translateX(4px); } to { opacity: 1; transform: scale(1) translateX(0); } }
@keyframes hc-in-left { from { opacity: 0; transform: scale(0.96) translateX(-4px); } to { opacity: 1; transform: scale(1) translateX(0); } }
@keyframes hc-in-top { from { opacity: 0; transform: scale(0.96) translateY(-4px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes hc-in-bottom { from { opacity: 0; transform: scale(0.96) translateY(4px); } to { opacity: 1; transform: scale(1) translateY(0); } }
`;
  document.head.appendChild(el);
}

function getAnimationName(
  followCursor: boolean | 'x' | 'y',
  side: string
): string {
  if (followCursor) return 'hc-in';
  const map: Record<string, string> = {
    right: 'hc-in-right',
    left: 'hc-in-left',
    top: 'hc-in-top',
    bottom: 'hc-in-bottom',
  };
  return map[side] || 'hc-in';
}

const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(
  (
    {
      children,
      side = 'right',
      sideOffset = 8,
      align = 'center',
      alignOffset = 0,
      followCursor = false,
      transitionDuration = 0.2,
      className = '',
      ...props
    },
    ref
  ) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const animationName = getAnimationName(followCursor, side);

    useEffect(() => {
      injectKeyframes();
    }, []);

    useEffect(() => {
      if (!followCursor) return;
      const handler = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
      document.addEventListener('mousemove', handler);
      return () => document.removeEventListener('mousemove', handler);
    }, [followCursor]);

    return (
      <HoverCardPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={`z-50 w-80 rounded-xl border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--surface-raised,#1a1a2e)] p-4 shadow-xl ${className}`}
        asChild
        {...props}
      >
        <div
          style={{
            animation: `${animationName} ${transitionDuration}s cubic-bezier(0.16,1,0.3,1) forwards`,
            ...(followCursor
              ? {
                  position: 'fixed' as const,
                  left: cursorPos.x,
                  top: cursorPos.y,
                  transform: 'translate(-50%,-50%)',
                }
              : {}),
          }}
        >
          {children}
        </div>
      </HoverCardPrimitive.Content>
    );
  }
);

HoverCardContent.displayName = 'HoverCardContent';

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardPortal,
};

export type { HoverCardContentProps };
