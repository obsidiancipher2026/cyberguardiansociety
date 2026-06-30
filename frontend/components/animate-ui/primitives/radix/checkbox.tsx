'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
} from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className = '', ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={`peer h-5 w-5 shrink-0 rounded-sm border border-[var(--border, rgba(255,255,255,0.2))] bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-core, #06b6d4)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--cyan-core, #06b6d4)] data-[state=checked]:border-[var(--cyan-core, #06b6d4)] data-[state=checked]:text-white ${className}`}
    {...props}
  >
    <CheckboxIndicator />
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = 'Checkbox';

interface CheckboxIndicatorProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator> {}

const CheckboxIndicator = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Indicator>,
  CheckboxIndicatorProps
>(({ className = '', children, ...props }, ref) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes checkmarkIn {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
      }
      .checkbox-indicator[data-state='checked'] {
        animation: checkmarkIn 0.25s ease-out;
      }
    ` }} />
    <CheckboxPrimitive.Indicator
      ref={ref}
      className={`checkbox-indicator flex items-center justify-center ${className}`}
      {...props}
    >
      <svg
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8.5L6.5 12L13 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </CheckboxPrimitive.Indicator>
  </>
));

CheckboxIndicator.displayName = 'CheckboxIndicator';

export { Checkbox, CheckboxIndicator };
export type { CheckboxProps, CheckboxIndicatorProps };
