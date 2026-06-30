'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface CursorState {
  position: { x: number; y: number };
  label: string | null;
  visible: boolean;
}

const CursorContext = createContext<CursorState>({
  position: { x: 0, y: 0 },
  label: null,
  visible: false,
});

interface CursorProviderProps {
  children: ReactNode;
  global?: boolean;
}

function CursorProvider({ children, global = false }: CursorProviderProps) {
  const [state, setState] = useState<CursorState>({
    position: { x: 0, y: 0 },
    label: null,
    visible: false,
  });

  useEffect(() => {
    if (!global) return;

    const handleMouseMove = (e: MouseEvent) => {
      setState((prev) => ({
        ...prev,
        position: { x: e.clientX, y: e.clientY },
        visible: true,
      }));
    };

    const handleMouseLeave = () => {
      setState((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [global]);

  return (
    <CursorContext.Provider value={state}>
      {children}
    </CursorContext.Provider>
  );
}

function CursorContainer({ children }: { children?: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

interface CursorProps {
  className?: string;
}

function Cursor({ className = '' }: CursorProps) {
  const { position, visible } = useContext(CursorContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setX(position.x);
      setY(position.y);
    });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [position.x, position.y]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none ${className}`}
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

interface CursorFollowProps {
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
}

function CursorFollow({
  children,
  side = 'right',
  sideOffset = 12,
  align = 'center',
  alignOffset = 0,
}: CursorFollowProps) {
  const { position, visible } = useContext(CursorContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    let offsetX = 0;
    let offsetY = 0;

    switch (side) {
      case 'top':
        offsetY = -sideOffset;
        break;
      case 'bottom':
        offsetY = sideOffset;
        break;
      case 'left':
        offsetX = -sideOffset;
        break;
      case 'right':
        offsetX = sideOffset;
        break;
    }

    let alignX = 0;
    let alignY = 0;

    if (side === 'top' || side === 'bottom') {
      if (align === 'start') alignX = alignOffset;
      else if (align === 'end') alignX = -alignOffset;
    } else {
      if (align === 'start') alignY = alignOffset;
      else if (align === 'end') alignY = -alignOffset;
    }

    const raf = requestAnimationFrame(() => {
      setX(position.x + offsetX + alignX);
      setY(position.y + offsetY + alignY);
    });
    return () => cancelAnimationFrame(raf);
  }, [position, side, sideOffset, align, alignOffset]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {children}
    </div>
  );
}

export { CursorProvider, CursorContainer, Cursor, CursorFollow };
export type { CursorProviderProps, CursorProps, CursorFollowProps };
