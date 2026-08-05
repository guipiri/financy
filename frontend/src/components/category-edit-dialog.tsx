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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CATEGORY_COLOR_OPTIONS, CATEGORY_ICON_OPTIONS } from '@/constants';
import { useUpdateCategoryMutation } from '@/hooks/api/useUpdateCategory';
import { cn } from '@/lib/utils';
import type { CategoryIcons, CategoryTones } from '@/types/category';

export interface CategoryToEdit {
  id: string;
  title: string;
  description?: string | null;
  color?: string | null;
  iconKey?: string | null;
}

interface CategoryEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryToEdit | null;
}

const DEFAULT_FORM = {
  title: '',
  description: '',
  iconKey: 'briefcase-business' as CategoryIcons,
  color: 'green' as CategoryTones,
};

export function CategoryEditDialog({
  open,
  onOpenChange,
  category,
}: CategoryEditDialogProps) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const { mutate: updateCategory, isPending } = useUpdateCategoryMutation();

  useEffect(() => {
    if (open && category) {
      setForm({
        title: category.title || '',
        description: category.description || '',
        iconKey: (category.iconKey as CategoryIcons) || 'briefcase-business',
        color: (category.color as CategoryTones) || 'green',
      });
    }
  }, [open, category]);

  const canSubmit = form.title.trim().length >= 2 && !isPending && !!category;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!category) return;

    updateCategory(
      {
        id: category.id,
        data: {
          title: form.title.trim(),
          description: form.description.trim(),
          color: form.color,
          iconKey: form.iconKey,
        },
      },
      {
        onSuccess: () => {
          toast.success('Categoria atualizada com sucesso!');
          onOpenChange(false);
        },
        onError: (err) => {
          const apiError =
            (
              err as unknown as {
                response?: { errors?: { message: string }[] };
              }
            ).response?.errors?.[0]?.message ||
            'Ocorreu um erro ao atualizar a categoria. Tente novamente.';
          toast.error(apiError);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>
            Atualize as informações da sua categoria
          </DialogDescription>
        </DialogHeader>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="edit-category-title">Título</Label>
            <Input
              id="edit-category-title"
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
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category-description">Descrição</Label>
            <Input
              id="edit-category-description"
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
              className="h-12 text-base"
            />
            <p className="text-xs text-muted-foreground">Opcional</p>
          </div>

          <div className="space-y-2">
            <Label>Ícone</Label>
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
                        ? 'border-primary bg-muted'
                        : 'border-border bg-card hover:bg-muted',
                    )}
                  >
                    <Icon
                      className={cn(
                        'size-5',
                        isSelected
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <Label>Cor</Label>
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
                      'flex h-7.5 items-center justify-center rounded-lg border p-1 transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                      isSelected
                        ? 'border-primary bg-muted'
                        : 'border-border bg-card hover:bg-muted',
                    )}
                  >
                    <span
                      className="h-full w-full rounded-[4px]"
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
            className="h-12 w-full text-base font-medium"
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
