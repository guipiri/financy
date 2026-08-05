import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  CircleArrowRight,
  Plus,
  Wallet,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryColorsMapper, CategoryIconsMapper } from '@/constants';
import { useFetchCategoriesForDashboardQuery } from '@/hooks/api/useCategories';
import { useFetchTransactionsQuery } from '@/hooks/api/useTransactions';
import { cn, formatCentsToBRL } from '@/lib/utils';
import type { CategoryIcons, CategoryTones } from '@/types/category';

type SummaryCard = {
  title: string;
  value: string;
  icon: typeof Wallet;
  iconClassName: string;
};

const summaryCards: SummaryCard[] = [
  {
    title: 'Saldo total',
    value: 'R$ 12.847,32',
    icon: Wallet,
    iconClassName: 'text-purple-base',
  },
  {
    title: 'Receitas do mês',
    value: 'R$ 4.250,00',
    icon: ArrowUpCircle,
    iconClassName: 'text-green-dark',
  },
  {
    title: 'Despesas do mês',
    value: 'R$ 2.180,45',
    icon: ArrowDownCircle,
    iconClassName: 'text-red-base',
  },
];

export function CategoryPill({
  tone,
  label,
}: {
  tone: CategoryTones;
  label: string;
}) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  return (
    <p
      className={cn(
        'items-center rounded-full px-3 py-1 text-sm font-medium text-center truncate',
        CategoryColorsMapper[tone][theme],
      )}
    >
      {label}
    </p>
  );
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

function Dashboard() {
  const { data: transactions, isLoading: transactionsIsLoading } =
    useFetchTransactionsQuery();

  const { data: categories, isLoading: categoriesIsLoading } =
    useFetchCategoriesForDashboardQuery();
  const categoryItems = categories?.categories ?? [];

  return (
    <div className="mx-auto flex flex-col md:grid md:grid-cols-3 md:grid-rows-[auto_1fr] w-full max-w-7xl gap-6">
      {summaryCards.map((card) => (
        <Card key={card.title} className="rounded-[12px] p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <SummaryIcon icon={card.icon} className={card.iconClassName} />
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-gray-500">
                {card.title}
              </p>
            </div>
            <p className="text-lg sm:text-[1.75rem] font-bold leading-8 tracking-tight text-gray-800">
              {card.value}
            </p>
          </div>
        </Card>
      ))}

      <Card className="col-span-2 overflow-hidden p-0 sm:p-0 shadow-xs h-fit">
        <div className="flex items-center justify-between border-b border-border px-6 pb-[21px] pt-5">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-gray-500">
            Transações recentes
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto gap-1 px-0 text-sm font-medium text-[#1f6f43] hover:bg-transparent hover:text-[#1f6f43]/80"
          >
            Ver todas
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="divide-y divide-border">
          {transactionsIsLoading ? (
            <p className="text-center p-4">Carregando...</p>
          ) : (
            transactions?.transactions.map((transaction) => {
              const CatIcon =
                CategoryIconsMapper[
                  (transaction.category?.iconKey as CategoryIcons) ||
                    'briefcase-business'
                ];
              const date = new Date(transaction.date as string);

              return (
                <div
                  key={`${transaction.description}-${transaction.date}`}
                  className="flex min-h-20 items-center px-6 py-4"
                >
                  <div className="flex flex-1 items-center gap-4 pr-4">
                    <div
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-lg',
                        CategoryColorsMapper[
                          (transaction.category?.color as CategoryTones) ||
                            'blue'
                        ].light,
                      )}
                    >
                      <CatIcon
                        className={cn(
                          'size-4',
                          CategoryColorsMapper[
                            (transaction.category?.color as CategoryTones) ||
                              'blue'
                          ].light,
                        )}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-base font-medium leading-6 text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm leading-5 text-gray-600">
                        {date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-[160px] justify-center px-4">
                    <CategoryPill
                      tone={
                        (transaction.category?.color as CategoryTones) || 'blue'
                      }
                      label={transaction.category?.title || 'Sem categoria'}
                    />
                  </div>

                  <div className="flex w-[160px] items-center justify-end gap-2 px-4">
                    <p className="text-sm font-semibold whitespace-nowrap text-gray-800">
                      {formatCentsToBRL(transaction.amountInCents)}
                    </p>
                    <CircleArrowRight
                      className={cn(
                        'size-4 shrink-0',
                        transaction.type === 'INCOME'
                          ? '-rotate-90 text-green-dark'
                          : 'rotate-90 text-red-base',
                      )}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <Button
            variant="ghost"
            size="sm"
            className="mx-auto flex h-auto items-center gap-1 px-0 text-sm font-medium text-[#1f6f43] hover:bg-transparent hover:text-[#1f6f43]/80"
          >
            <Plus className="size-4" />
            Nova transação
          </Button>
        </div>
      </Card>

      <Card className="p-0 sm:p-0 shadow-xs h-fit">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-gray-500">
            Categorias
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto gap-1 px-0 text-sm font-medium text-[#1f6f43] hover:bg-transparent hover:text-[#1f6f43]/80"
          >
            Gerenciar
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="space-y-5 px-6 py-6">
          {categoriesIsLoading ? (
            <p>Carregando...</p>
          ) : (
            categoryItems.map((category) => (
              <div key={category.id} className="flex items-center gap-1">
                <CategoryPill
                  tone={category.color as CategoryTones}
                  label={category.title}
                />
                <p className="min-w-0 flex-1 text-right text-sm text-gray-600">
                  {category.items?.qty ?? 0}
                </p>
                <p className="w-[88px] text-right text-sm font-semibold text-gray-800">
                  {formatCentsToBRL(category.items?.amountIncents ?? 0)}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
