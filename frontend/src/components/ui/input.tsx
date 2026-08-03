import { Input as InputPrimitive } from '@base-ui/react/input';
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
} from 'react';

import { cn } from '@/lib/utils';

interface FieldContextValue {
  hasError?: boolean;
}

const FieldContext = createContext<FieldContextValue>({});

export const useFieldContext = () => useContext(FieldContext);

export interface InputProps extends ComponentProps<'input'> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  hasError?: boolean;
}

function Input({
  className,
  type,
  startIcon,
  endIcon,
  hasError: hasErrorProp,
  ...props
}: InputProps) {
  const { hasError: fieldHasError } = useFieldContext();
  const isError = hasErrorProp ?? fieldHasError;

  return (
    <div
      data-slot="input-wrapper"
      data-error={isError ? 'true' : undefined}
      className="group/input relative flex items-center w-full"
    >
      {startIcon && (
        <div
          className={cn(
            'absolute left-3.5 flex items-center justify-center',
            'pointer-events-none text-muted-foreground z-10 [&_svg]:size-4.5 [&_svg]:stroke-[1.75]',
            'group-focus-within:text-primary',
            isError && 'text-destructive! group-focus-within:text-destructive!',
          )}
        >
          {startIcon}
        </div>
      )}
      <InputPrimitive
        type={type}
        data-slot="input"
        aria-invalid={isError ? true : undefined}
        className={cn(
          'w-full min-w-0 rounded-lg border border-border bg-background px-3 py-3.5 text-foreground shadow-2xs transition-all outline-none placeholder:text-muted-foreground/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50',
          startIcon && 'pl-10.5',
          endIcon && 'pr-10.5',
          className,
        )}
        {...props}
      />
      {endIcon && (
        <div className="absolute right-3.5 flex items-center justify-center text-muted-foreground z-10 [&_svg]:size-4.5 [&_svg]:stroke-[1.75]">
          {endIcon}
        </div>
      )}
    </div>
  );
}

export interface FieldProps extends ComponentProps<'div'> {
  children: ReactNode;
  hasError?: boolean;
}

function Field({ children, className, hasError, ...props }: FieldProps) {
  return (
    <FieldContext.Provider value={{ hasError }}>
      <div
        data-slot="field"
        data-error={hasError ? 'true' : undefined}
        className={cn('space-y-2 group', className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
}

export { Field, Input };
