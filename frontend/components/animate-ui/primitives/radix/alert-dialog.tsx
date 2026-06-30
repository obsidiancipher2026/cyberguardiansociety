'use client';

import {
  forwardRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

type AlertDialogFlipDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogCancel = AlertDialogPrimitive.Cancel;

const AlertDialogAction = AlertDialogPrimitive.Action;

interface AlertDialogOverlayProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  transitionDuration?: number;
}

const AlertDialogOverlay = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ transitionDuration = 0.2, className = '', ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 ${className}`}
    style={{
      animation: `alertDialogOverlayEnter ${transitionDuration}s ease-out forwards`,
    }}
    {...props}
  />
));

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

interface AlertDialogContentProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  from?: AlertDialogFlipDirection;
  transitionDuration?: number;
  children: ReactNode;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const AlertDialogContent = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(
  (
    {
      from = 'center',
      transitionDuration = 0.25,
      className = '',
      children,
      ...props
    },
    ref
  ) => (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes alertDialogOverlayEnter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes alertDialogContentTop {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes alertDialogContentBottom {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes alertDialogContentLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes alertDialogContentRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes alertDialogContentCenter {
          from { opacity: 0; scale: 0.95; }
          to { opacity: 1; scale: 1; }
        }
      ` }} />
      <AlertDialogPortal>
        <AlertDialogOverlay transitionDuration={transitionDuration} />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <AlertDialogPrimitive.Content
            ref={ref}
            className={`w-full max-w-lg rounded-xl bg-[var(--surface-raised, #1a1a2e)] p-6 shadow-xl border border-[var(--border, rgba(255,255,255,0.1))] ${className}`}
            style={{
              animation: `alertDialogContent${capitalize(from)} ${transitionDuration}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
            {...props}
          >
            {children}
          </AlertDialogPrimitive.Content>
        </div>
      </AlertDialogPortal>
    </>
  )
);

AlertDialogContent.displayName = 'AlertDialogContent';

function AlertDialogHeader({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-lg font-semibold text-[var(--text-primary, #f0f0f0)] ${className}`}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-[var(--text-secondary, #a0a0b0)] ${className}`}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
};

export type {
  AlertDialogFlipDirection,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
};
