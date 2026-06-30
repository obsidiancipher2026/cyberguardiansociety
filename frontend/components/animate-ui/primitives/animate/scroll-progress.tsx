'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

interface ScrollProgressState {
  progress: number;
  direction: 'vertical' | 'horizontal';
  containerRef: RefObject<HTMLDivElement | null>;
}

const ScrollProgressContext = createContext<ScrollProgressState>({
  progress: 0,
  direction: 'vertical',
  containerRef: { current: null },
});

interface ScrollProgressProviderProps {
  children: ReactNode;
  direction?: 'vertical' | 'horizontal';
}

function ScrollProgressProvider({
  children,
  direction = 'vertical',
}: ScrollProgressProviderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    let newProgress = 0;

    if (direction === 'vertical') {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      newProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    } else {
      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth - el.clientWidth;
      newProgress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;
    }

    setProgress(Math.min(Math.max(newProgress, 0), 1));
  }, [direction]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <ScrollProgressContext.Provider
      value={{ progress, direction, containerRef }}
    >
      {children}
    </ScrollProgressContext.Provider>
  );
}

interface ScrollProgressContainerProps {
  children: ReactNode;
  global?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function ScrollProgressContainer({
  children,
  global = false,
  className = '',
  style,
}: ScrollProgressContainerProps) {
  const { containerRef } = useContext(ScrollProgressContext);
  const internalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (global) {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        document.documentElement as HTMLDivElement;
    }
  }, [global, containerRef]);

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (!global) {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
      }
    },
    [global, containerRef]
  );

  if (global) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={refCallback}
      className={className}
      style={{ overflow: 'auto', ...style }}
    >
      {children}
    </div>
  );
}

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

function ScrollProgress({
  className = '',
  color = 'var(--cyan-core, #06b6d4)',
  height = 3,
}: ScrollProgressProps) {
  const { progress, direction } = useContext(ScrollProgressContext);

  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        position: 'fixed',
        ...(isHorizontal
          ? { top: 0, left: 0, right: 0, height }
          : { top: 0, bottom: 0, right: 0, width: height }),
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: color,
          transition: isHorizontal ? 'width 0.1s linear' : 'height 0.1s linear',
          ...(isHorizontal
            ? { width: `${progress * 100}%`, height: '100%' }
            : { height: `${progress * 100}%`, width: '100%' }),
        }}
      />
    </div>
  );
}

export { ScrollProgressProvider, ScrollProgressContainer, ScrollProgress };
export type {
  ScrollProgressProviderProps,
  ScrollProgressContainerProps,
  ScrollProgressProps,
};
