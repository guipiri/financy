import { ArrowUpDown, Plus, SquarePen, Star, Tag, Trash } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { CategoryCreateDialog } from '@/components/category-create-dialog';
import {
  CategoryEditDialog,
  type CategoryToEdit,
} from '@/components/category-edit-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryColorsMapper, CategoryIconsMapper } from '@/constants';
import type { FetchCategoriesForDashboardQuery } from '@/graphql/generated/graphql';
import { useFetchCategoriesForDashboardQuery } from '@/hooks/api/useCategories';
import { cn } from '@/lib/utils';
import type { CategoryIcons, CategoryTones } from '@/types/category';
import { CategoryPill } from './dashboard';

type SummaryCard = {
  title: string;
  value: string;
  icon: typeof Tag;
  iconClassName: string;
};

function getToneClasses(tone: CategoryTones) {
  const [bgClass, textClass] = CategoryColorsMapper[tone].light.split(' ');

  return {
    bgClass,
    textClass,
  };
}

function formatItemsLabel(quantity: number) {
  return quantity === 1 ? '1 item' : `${quantity} itens`;
}

function SummaryIcon({
  icon: Icon,
  className,
}: {
  icon: SummaryCard['icon'];
  className: string;
}) {
  return <Icon className={cn('size-5 shrink-0', className)} />;
}

function ActionButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      onClick={onClick}
      className="size-8 rounded-lg border-gray-300 bg-white text-gray-500 shadow-none hover:bg-gray-50 hover:text-gray-700"
    >
      {children}
    </Button>
  );
}

interface SummarySectionProps {
  categories: FetchCategoriesForDashboardQuery['categories'];
}

function SummarySection({ categories }: SummarySectionProps) {
  const totalCategories = categories.length;
  const totalTransactions = categories.reduce(
    (acc, category) => acc + (category.items?.qty ?? 0),
    0,
  );
  const mostUsedCategory = [...categories].sort(
    (a, b) => (b.items?.qty ?? 0) - (a.items?.qty ?? 0),
  )[0];

  const summaryCards: SummaryCard[] = [
    {
      title: 'Total de categorias',
      value: totalCategories.toString(),
      icon: Tag,
      iconClassName: 'text-gray-700',
    },
    {
      title: 'Total de transações',
      value: totalTransactions.toString(),
      icon: ArrowUpDown,
      iconClassName: 'text-purple-base',
    },
    {
      title: 'Categoria mais utilizada',
      value: mostUsedCategory?.title || 'Nenhuma',
      icon:
        CategoryIconsMapper[mostUsedCategory?.iconKey as CategoryIcons] || Star,
      iconClassName: 'text-blue-base',
    },
  ];
  return (
    <section className="md:grid gap-6 md:grid-cols-3 flex flex-col">
      {summaryCards.map((card) => (
        <Card key={card.title} className="shadow-xs p-4 sm:p-5 lg:p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-700">
              <SummaryIcon
                icon={card.icon}
                className={cn(card.iconClassName, 'size-6 lg:size-8')}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="sm:text-xl lg:text-[28px] text-lg font-bold leading-8 text-gray-800 truncate"
                title={card.value}
              >
                {card.value}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.05em] text-gray-500">
                {card.title}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}

interface CategoriesListProps {
  categories: FetchCategoriesForDashboardQuery['categories'];
  onEditCategory: (category: CategoryToEdit) => void;
}

function CategoriesList({ categories, onEditCategory }: CategoriesListProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => {
        const iconKey =
          (category.iconKey as CategoryIcons) || 'briefcase-business';
        const CategoryIcon =
          CategoryIconsMapper[iconKey] ||
          CategoryIconsMapper['briefcase-business'];
        const { bgClass, textClass } = getToneClasses(
          category.color as CategoryTones,
        );

        return (
          <Card key={category.id} className="gap-5 p-[25px] sm:p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg',
                  bgClass,
                )}
              >
                <CategoryIcon className={cn('size-4', textClass)} />
              </div>

              <div className="flex items-center gap-2">
                <ActionButton label={`Excluir categoria ${category.title}`}>
                  <Trash className="size-4 text-destructive" />
                </ActionButton>
                <ActionButton
                  label={`Editar categoria ${category.title}`}
                  onClick={() => onEditCategory(category)}
                >
                  <SquarePen className="size-4 text-gray-700" />
                </ActionButton>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-[16px] font-semibold leading-6 text-gray-800">
                {category.title}
              </h2>
              <p className="min-h-10 text-[14px] leading-5 text-gray-600">
                {category.description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <CategoryPill
                tone={category.color as CategoryTones}
                label={category.title}
              />

              <p className="whitespace-nowrap text-[14px] leading-5 text-gray-600">
                {formatItemsLabel(category.items?.qty ?? 0)}
              </p>
            </div>
          </Card>
        );
      })}
    </section>
  );
}

export default function CategoriesPage() {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryToEdit | null>(
    null,
  );

  const { data: categoriesData, isLoading: categoriesLoading } =
    useFetchCategoriesForDashboardQuery();

  const handleEditCategory = (category: CategoryToEdit) => {
    setCategoryToEdit(category);
    setIsEditCategoryOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-8 md:px-10 lg:px-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-[24px] font-bold leading-8 tracking-tight text-gray-800">
              Categorias
            </h1>
            <p className="text-[16px] leading-6 text-gray-600">
              Organize suas transações por categorias
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setIsCreateCategoryOpen(true)}
            className="h-9 gap-2 my-auto rounded-lg bg-[#1f6f43] px-3 text-sm font-medium text-white shadow-none hover:bg-[#1f6f43]/90"
          >
            <Plus className="size-4" />
            Nova categoria
          </Button>
        </header>

        <CategoryCreateDialog
          open={isCreateCategoryOpen}
          onOpenChange={setIsCreateCategoryOpen}
        />

        <CategoryEditDialog
          open={isEditCategoryOpen}
          onOpenChange={setIsEditCategoryOpen}
          category={categoryToEdit}
        />

        {categoriesLoading || !categoriesData?.categories ? (
          <p>Carregando...</p>
        ) : (
          <SummarySection categories={categoriesData.categories} />
        )}

        {categoriesLoading || !categoriesData?.categories ? (
          <p>Carregando...</p>
        ) : (
          <CategoriesList
            categories={categoriesData.categories}
            onEditCategory={handleEditCategory}
          />
        )}
      </div>
    </main>
  );
}
