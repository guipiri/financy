import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusinessIcon,
  CarFront,
  Dumbbell,
  Gift,
  HeartIcon,
  House,
  type LucideIcon,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from 'lucide-react';
import type { CategoryIcons, CategoryTones } from '@/types/category';

export const CategoryIconsMapper: Record<CategoryIcons, LucideIcon> = {
  'briefcase-business': BriefcaseBusinessIcon,
  'car-front': CarFront,
  heart: HeartIcon,
  'piggy-bank': PiggyBank,
  'shopping-cart': ShoppingCart,
  ticket: Ticket,
  'tool-case': ToolCase,
  utensilis: Utensils,
  'paw-print': PawPrint,
  house: House,
  gift: Gift,
  dumbbell: Dumbbell,
  'book-open': BookOpen,
  'baggage-claim': BaggageClaim,
  mailbox: Mailbox,
  'receip-text': ReceiptText,
};

export const CategoryColorsMapper = {
  green: {
    light: 'bg-green-light text-green-base',
    dark: 'bg-green-base text-green-light',
  },
  blue: {
    light: 'bg-blue-light text-blue-base',
    dark: 'bg-blue-base text-blue-light',
  },
  red: {
    light: 'bg-red-light text-red-base',
    dark: 'bg-red-base text-red-light',
  },
  purple: {
    light: 'bg-purple-light text-purple-base',
    dark: 'bg-purple-base text-purple-light',
  },
  orange: {
    light: 'bg-orange-light text-orange-base',
    dark: 'bg-orange-base text-orange-light',
  },
  pink: {
    light: 'bg-pink-light text-pink-base',
    dark: 'bg-pink-base text-pink-light',
  },
  yellow: {
    light: 'bg-yellow-light text-yellow-base',
    dark: 'bg-yellow-base text-yellow-light',
  },
} as const satisfies Record<CategoryTones, { dark: string; light: string }>;
