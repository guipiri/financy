import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import type { TransactionType } from '@/graphql/generated/graphql';
import { useFetchCategoriesForDashboardQuery } from '@/hooks/api/useCategories';
import { useCreateTransactionMutation } from '@/hooks/api/useCreateTransaction';
import { cn } from '@/lib/utils';

const DEFAULT_FORM = {
  description: '',
  date: '',
  amount: '',
  categoryId: '',
  type: 'EXPENSE' as TransactionType,
};

interface TransactionCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function parseAmountToCents(value: string) {
  const normalizedValue = value.replace(/\./g, '').replace(',', '.');
  const amount = Number(normalizedValue);

  if (!Number.isFinite(amount)) return 0;

  return Math.round(amount * 100);
}

function getApiError(err: unknown, fallback: string) {
  return (
    (err as { response?: { errors?: { message: string }[] } }).response
      ?.errors?.[0]?.message || fallback
  );
}

function buildTransactionDate(date: string) {
  return new Date(`${date}T12:00:00.000`).toISOString();
}

export function TransactionCreateDialog({
  open,
  onOpenChange,
}: TransactionCreateDialogProps) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useFetchCategoriesForDashboardQuery();
  const { mutate: createTransaction, isPending } =
    useCreateTransactionMutation();

  useEffect(() => {
    if (open) {
      setForm(DEFAULT_FORM);
    }
  }, [open]);

  const amountInCents = parseAmountToCents(form.amount);
  const canSubmit =
    form.description.trim().length >= 3 &&
    form.date.length > 0 &&
    form.categoryId.length > 0 &&
    amountInCents > 0 &&
    !isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    createTransaction(
      {
        description: form.description.trim(),
        amountInCents,
        type: form.type,
        date: buildTransactionDate(form.date),
        categoryId: form.categoryId,
      },
      {
        onSuccess: () => {
          toast.success('Transação criada com sucesso!');
          onOpenChange(false);
        },
        onError: (err) => {
          toast.error(
            getApiError(
              err,
              'Ocorreu um erro ao criar a transação. Tente novamente.',
            ),
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 rounded-[12px] border border-gray-200 p-2">
            {(
              [
                {
                  value: 'EXPENSE' as const,
                  label: 'Despesa',
                  icon: CircleArrowDown,
                  activeClass: 'border-danger bg-gray-100 text-gray-800',
                },
                {
                  value: 'INCOME' as const,
                  label: 'Receita',
                  icon: CircleArrowUp,
                  activeClass: 'border-[#1f6f43] bg-gray-100 text-gray-800',
                },
              ] satisfies {
                value: TransactionType;
                label: string;
                icon: typeof CircleArrowDown;
                activeClass: string;
              }[]
            ).map((option) => {
              const Icon = option.icon;
              const isSelected = form.type === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={isPending}
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      type: option.value,
                    }))
                  }
                  className={cn(
                    'flex h-[46px] items-center justify-center gap-3 rounded-lg border border-transparent px-3 text-[16px] leading-[18px] outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                    isSelected
                      ? option.activeClass
                      : 'text-gray-600 hover:bg-gray-50',
                  )}
                >
                  <Icon
                    className={cn(
                      'size-4',
                      form.type === 'EXPENSE' && isSelected
                        ? 'text-danger'
                        : form.type === 'INCOME' && isSelected
                          ? 'text-[#1f6f43]'
                          : 'text-gray-400',
                    )}
                  />
                  <span className={isSelected ? 'font-medium' : 'font-normal'}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <Field>
              <Label htmlFor="transaction-description">Descrição</Label>
              <Input
                id="transaction-description"
                name="description"
                type="text"
                placeholder="Ex. Almoço no restaurante"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                disabled={isPending}
                required
                minLength={3}
                className="h-12 text-base"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <Label htmlFor="transaction-date">Data</Label>
                <Input
                  id="transaction-date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  disabled={isPending}
                  required
                  className="h-12 text-base"
                />
              </Field>

              <Field>
                <Label htmlFor="transaction-amount">Valor</Label>
                <Input
                  id="transaction-amount"
                  name="amount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  startIcon={
                    <span className="text-[14px] text-gray-800">R$</span>
                  }
                  value={form.amount}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  disabled={isPending}
                  required
                  className="h-12 text-base placeholder:text-gray-800"
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="transaction-category">Categoria</Label>
              <Select
                id="transaction-category"
                value={form.categoryId}
                disabled={isPending || categoriesLoading}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    categoryId: event.target.value,
                  }))
                }
                required
                className="h-12 text-base"
              >
                <option value="">Selecione</option>
                {categoriesData?.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Button
            type="submit"
            disabled={!canSubmit}
            className="h-12 w-full bg-[#1f6f43] text-base font-medium text-white shadow-none hover:bg-[#1f6f43]/90"
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
