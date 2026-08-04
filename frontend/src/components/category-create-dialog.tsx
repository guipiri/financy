import { Dialog } from '@base-ui/react/dialog';
import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  Heart,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  X,
} from 'lucide-react';
import { type ComponentType, type FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateCategoryMutation } from '@/hooks/api/useCreateCategory';
import { cn } from '@/lib/utils';
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

const CATEGORY_ICON_OPTIONS: CategoryIconOption[] = [
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

const CATEGORY_COLOR_OPTIONS: CategoryColorOption[] = [
  { value: 'green', label: 'Verde', color: '#16a34a' },
  { value: 'blue', label: 'Azul', color: '#2563eb' },
  { value: 'purple', label: 'Roxo', color: '#9333ea' },
  { value: 'pink', label: 'Rosa', color: '#db2777' },
  { value: 'red', label: 'Vermelho', color: '#dc2626' },
  { value: 'orange', label: 'Laranja', color: '#ea580c' },
  { value: 'yellow', label: 'Amarelo', color: '#ca8a04' },
];

const DEFAULT_FORM = {
  title: '',
  description: '',
  iconKey: 'briefcase-business' as CategoryIcons,
  color: 'green' as CategoryTones,
};

interface CategoryCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryCreateDialog({
  open,
  onOpenChange,
}: CategoryCreateDialogProps) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const { mutate: createCategory, isPending } = useCreateCategoryMutation();

  useEffect(() => {
    if (open) {
      setForm(DEFAULT_FORM);
    }
  }, [open]);

  const canSubmit = form.title.trim().length >= 2 && !isPending;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createCategory(
      {
        title: form.title.trim(),
        description: form.description.trim(),
        color: form.color,
        iconKey: form.iconKey,
      },
      {
        onSuccess: () => {
          toast.success('Categoria criada com sucesso!');
          onOpenChange(false);
        },
        onError: (err) => {
          const apiError =
            (
              err as unknown as {
                response?: { errors?: { message: string }[] };
              }
            ).response?.errors?.[0]?.message ||
            'Ocorreu um erro ao criar a categoria. Tente novamente.';
          toast.error(apiError);
        },
      },
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-gray-900/20 backdrop-blur-[1px]" />
        <Dialog.Popup
          className={cn(
            'fixed left-1/2 top-1/2 w-[calc(100vw-32px)] max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-[12px] border border-gray-200 bg-white p-[25px] text-gray-800 shadow-[0_24px_80px_rgba(17,24,39,0.12)] outline-none',
          )}
        >
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1 space-y-0.5">
              <Dialog.Title className="text-[16px] font-semibold leading-6 text-gray-800">
                Nova categoria
              </Dialog.Title>
              <Dialog.Description className="block text-[14px] leading-5 text-gray-600">
                Organize suas transações com categorias
              </Dialog.Description>
            </div>

            <Dialog.Close
              aria-label="Fechar"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 outline-none transition-colors hover:bg-gray-50 hover:text-gray-700 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label
                htmlFor="category-title"
                className="text-[14px] text-gray-700"
              >
                Título
              </Label>
              <Input
                id="category-title"
                name="title"
                type="text"
                placeholder="Ex. Alimentação"
                value={form.title}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }));
                }}
                disabled={isPending}
                required
                minLength={2}
                className="h-12 border-gray-200 px-3.5 text-[16px] shadow-none placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category-description"
                className="text-[14px] text-gray-700"
              >
                Descrição
              </Label>
              <Input
                id="category-description"
                name="description"
                type="text"
                placeholder="Descrição da categoria"
                value={form.description}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }));
                }}
                disabled={isPending}
                className="h-12 border-gray-200 px-3.5 text-[16px] shadow-none placeholder:text-gray-400"
              />
              <p className="text-[12px] leading-4 text-gray-500">Opcional</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[14px] text-gray-700">Ícone</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_ICON_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = form.iconKey === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-label={option.label}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setForm((current) => ({
                          ...current,
                          iconKey: option.value,
                        }));
                      }}
                      disabled={isPending}
                      className={cn(
                        'flex size-[42px] items-center justify-center rounded-lg border transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                        isSelected
                          ? 'border-[#1f6f43] bg-gray-100'
                          : 'border-gray-200 bg-white hover:bg-gray-50',
                      )}
                    >
                      <Icon
                        className={cn(
                          'size-5',
                          isSelected ? 'text-gray-700' : 'text-gray-500',
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[14px] text-gray-700">Cor</Label>
              <div className="grid grid-cols-7 gap-2">
                {CATEGORY_COLOR_OPTIONS.map((option) => {
                  const isSelected = form.color === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-label={option.label}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setForm((current) => ({
                          ...current,
                          color: option.value,
                        }));
                      }}
                      disabled={isPending}
                      className={cn(
                        'flex h-10 items-center justify-center rounded-lg border p-1.5 transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                        isSelected
                          ? 'border-[#1f6f43] bg-gray-100'
                          : 'border-gray-200 bg-white hover:bg-gray-50',
                      )}
                    >
                      <span
                        className="h-5 w-full rounded-[4px]"
                        style={{ backgroundColor: option.color }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              disabled={!canSubmit}
              className="h-12 w-full rounded-lg bg-[#1f6f43] px-4 text-[16px] font-medium text-white shadow-none hover:bg-[#1f6f43]/90"
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
