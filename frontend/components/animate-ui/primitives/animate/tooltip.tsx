'use client';

import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

interface TooltipContentProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  children: ReactNode;
  showArrow?: boolean;
}

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      children,
      side = 'top',
      sideOffset = 4,
      showArrow = true,
      className = '',
      ...props
    },
    ref
  ) => (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(2px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes tooltipArrowIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .tooltip-content[data-state='open'] {
          animation: tooltipFadeIn 0.15s ease-out;
        }
        .tooltip-arrow[data-state='open'] {
          animation: tooltipArrowIn 0.15s ease-out 0.05s both;
        }
      ` }} />
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          className={`tooltip-content z-50 overflow-hidden rounded-md bg-[var(--surface-raised, #1a1a2e)] px-3 py-1.5 text-xs text-[var(--text-primary, #f0f0f0)] shadow-md border border-[var(--border, rgba(255,255,255,0.1))] ${className}`}
          {...props}
        >
          {children}
          {showArrow && (
            <TooltipPrimitive.Arrow className="tooltip-arrow fill-[var(--surface-raised, #1a1a2e)]" />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </>
  )
);

TooltipContent.displayName = 'TooltipContent';

interface TooltipArrowProps extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> {}

const TooltipArrow = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  TooltipArrowProps
>(({ className = '', ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={`fill-[var(--surface-raised, #1a1a2e)] ${className}`}
    {...props}
  />
));

TooltipArrow.displayName = 'TooltipArrow';

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
};

export type { TooltipContentProps, TooltipArrowProps };
