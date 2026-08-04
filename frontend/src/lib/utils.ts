import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCentsToBRL(cents: number | null | undefined) {
  return (cents ?? 0 / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
