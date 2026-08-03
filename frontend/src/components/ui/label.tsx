import type * as React from 'react';

import { cn } from '@/lib/utils';

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm text-gray-700 leading-none font-medium select-none transition-colors group-focus-within:text-primary group-data-[state=error]:text-destructive group-has-aria-invalid:text-destructive group-has-disabled:pointer-events-none group-has-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
