import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  BriefcaseBusinessIcon,
  CarFront,
  Dumbbell,
  Gift,
  Heart,
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
import type { ComponentType } from 'react';
import type { CategoryIcons, CategoryTones } from '@/types/category';

type CategoryIconOption = {
  value: CategoryIcons;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type CategoryColorOption = {
  value: CategoryTones;
  label: string;
  color: string;
};

export const CATEGORY_ICON_OPTIONS: CategoryIconOption[] = [
  {
    value: 'briefcase-business',
    label: 'briefcase-business',
    icon: BriefcaseBusiness,
  },
  { value: 'car-front', label: 'car-front', icon: CarFront },
  { value: 'heart', label: 'heart', icon: Heart },
  { value: 'piggy-bank', label: 'piggy-bank', icon: PiggyBank },
  { value: 'shopping-cart', label: 'shopping-cart', icon: ShoppingCart },
  { value: 'ticket', label: 'ticket', icon: Ticket },
  { value: 'tool-case', label: 'tool-case', icon: ToolCase },
  { value: 'utensilis', label: 'utensilis', icon: Utensils },
  { value: 'paw-print', label: 'paw-print', icon: PawPrint },
  { value: 'house', label: 'house', icon: House },
  { value: 'gift', label: 'gift', icon: Gift },
  { value: 'dumbbell', label: 'dumbbell', icon: Dumbbell },
  { value: 'book-open', label: 'book-open', icon: BookOpen },
  { value: 'baggage-claim', label: 'baggage-claim', icon: BaggageClaim },
  { value: 'mailbox', label: 'mailbox', icon: Mailbox },
  { value: 'receip-text', label: 'receip-text', icon: ReceiptText },
];

export const CATEGORY_COLOR_OPTIONS: CategoryColorOption[] = [
  { value: 'green', label: 'Verde', color: '#16a34a' },
  { value: 'blue', label: 'Azul', color: '#2563eb' },
  { value: 'purple', label: 'Roxo', color: '#9333ea' },
  { value: 'pink', label: 'Rosa', color: '#db2777' },
  { value: 'red', label: 'Vermelho', color: '#dc2626' },
  { value: 'orange', label: 'Laranja', color: '#ea580c' },
  { value: 'yellow', label: 'Amarelo', color: '#ca8a04' },
];

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
