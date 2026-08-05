import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative w-full">
      <select
        data-slot="select"
        className={cn(
          'h-[38px] w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 pr-9 text-[14px] leading-5 text-gray-800 shadow-none outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-600" />
    </div>
  );
}

export { Select };
