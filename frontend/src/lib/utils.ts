import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCentsToBRL(cents: number | null | undefined) {
  return ((cents ?? 0) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function getInitialsFromName(name: string) {
  const split = name.split(' ');
  return (
    split[0].charAt(0).toUpperCase() +
    split[split.length - 1].charAt(0).toUpperCase()
  );
}
