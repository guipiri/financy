import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  CircleArrowRight,
  Plus,
  Wallet,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { routes } from '@/App';
import { TransactionCreateDialog } from '@/components/transaction-create-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryColorsMapper, CategoryIconsMapper } from '@/constants';
import { useFetchCategoriesForDashboardQuery } from '@/hooks/api/useCategories';
import {
  useFetchTransactionsPageQuery,
  useFetchTransactionsSummaryQuery,
} from '@/hooks/api/useTransactions';
import { cn, formatCentsToBRL } from '@/lib/utils';
import type { CategoryIcons, CategoryTones } from '@/types/category';
import { formatItemsLabel } from './categories';

type SummaryCard = {
  title: string;
  value: string;
  icon: typeof Wallet;
  iconClassName: string;
};

export function CategoryPill({
  tone,
  label,
  className,
}: {
  tone: CategoryTones;
  label: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  return (
    <p
      className={cn(
        'items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium text-center truncate max-w-full',
        CategoryColorsMapper[tone][theme],
        className,
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: summaryData, isLoading: summaryIsLoading } =
    useFetchTransactionsSummaryQuery();
  const { data: transactionsData, isLoading: transactionsIsLoading } =
    useFetchTransactionsPageQuery({ perPage: 5, page: 1 });

  const { data: categories, isLoading: categoriesIsLoading } =
    useFetchCategoriesForDashboardQuery();
  const categoryItems = categories?.categories ?? [];
  const recentTransactions = transactionsData?.transactionsPage.items ?? [];

  const summaryCards: SummaryCard[] = useMemo(() => {
    const summary = summaryData?.transactionsSummary;

    return [
      {
        title: 'Saldo total',
        value: formatCentsToBRL(summary?.totalBalanceInCents ?? 0),
        icon: Wallet,
        iconClassName: 'text-purple-base',
      },
      {
        title: 'Receitas do mês',
        value: formatCentsToBRL(summary?.monthIncomeInCents ?? 0),
        icon: ArrowUpCircle,
        iconClassName: 'text-green-dark',
      },
      {
        title: 'Despesas do mês',
        value: formatCentsToBRL(summary?.monthExpenseInCents ?? 0),
        icon: ArrowDownCircle,
        iconClassName: 'text-red-base',
      },
    ];
  }, [summaryData]);

  return (
    <>
      <TransactionCreateDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 lg:grid-rows-[auto_1fr] w-full max-w-7xl gap-4 sm:gap-6">
        {summaryCards.map((card) => (
          <Card
            key={card.title}
            className="col-span-1 rounded-[12px] p-4 sm:p-6 shadow-xs"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <SummaryIcon icon={card.icon} className={card.iconClassName} />
                <p className="text-xs font-medium uppercase tracking-[0.06em] text-gray-500">
                  {card.title}
                </p>
              </div>
              <p className="text-xl sm:text-[1.75rem] font-bold leading-7 sm:leading-8 tracking-tight text-gray-800">
                {summaryIsLoading ? '...' : card.value}
              </p>
            </div>
          </Card>
        ))}

        <Card className="col-span-1 sm:col-span-3 lg:col-span-2 overflow-hidden p-0 sm:p-0 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-4 sm:pb-[21px] sm:pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-gray-500">
              Transações recentes
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto gap-1 px-0 text-sm font-medium text-[#1f6f43] hover:bg-transparent hover:text-[#1f6f43]/80"
            >
              <Link
                to={routes.transactions.path}
                className="flex items-center gap-1"
              >
                Ver todas
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="divide-y divide-border">
            {transactionsIsLoading ? (
              <p className="text-center p-4 text-sm">Carregando...</p>
            ) : recentTransactions.length === 0 ? (
              <p className="text-center p-4 text-sm text-gray-500">
                Nenhuma transação encontrada
              </p>
            ) : (
              recentTransactions.map((transaction) => {
                const CatIcon =
                  CategoryIconsMapper[
                    (transaction.category?.iconKey as CategoryIcons) ||
                      'briefcase-business'
                  ];
                const date = new Date(transaction.date as string);

                return (
                  <div
                    key={`${transaction.description}-${transaction.date}`}
                    className="flex min-h-16 sm:min-h-20 items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-1 sm:gap-2 lg:gap-3"
                  >
                    <div className="flex flex-1 items-center gap-3 sm:gap-4 min-w-0 pr-2 sm:pr-4">
                      <div
                        className={cn(
                          'flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-lg',
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

                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base font-medium leading-5 sm:leading-6 text-gray-800">
                          {transaction.description}
                        </p>
                        <p className="text-sm leading-5 text-gray-600 hidden sm:block">
                          {date.toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1 sm:hidden">
                          <span className="text-xs text-gray-600">
                            {date.toLocaleDateString()}
                          </span>
                          <CategoryPill
                            tone={
                              (transaction.category?.color as CategoryTones) ||
                              'blue'
                            }
                            label={
                              transaction.category?.title || 'Sem categoria'
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex w-[110px] md:w-[160px] justify-center px-2 md:px-4 shrink-0">
                      <CategoryPill
                        tone={
                          (transaction.category?.color as CategoryTones) ||
                          'blue'
                        }
                        label={transaction.category?.title || 'Sem categoria'}
                      />
                    </div>

                    <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0 sm:w-[140px] md:w-[160px] sm:px-2 md:px-4">
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

          <div className="border-t border-border px-4 sm:px-6 py-4 sm:py-5">
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="ghost"
              size="sm"
              className="mx-auto flex h-auto items-center gap-1 px-0 text-sm font-medium text-[#1f6f43] hover:bg-transparent hover:text-[#1f6f43]/80"
            >
              <Plus className="size-4" />
              Nova transação
            </Button>
          </div>
        </Card>

        <Card className="col-span-1 sm:col-span-3 lg:col-span-1 p-0 sm:p-0 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-4 sm:py-5">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-gray-500">
              Categorias
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto gap-1 px-0 text-sm font-medium text-[#1f6f43] hover:bg-transparent hover:text-[#1f6f43]/80"
            >
              <Link
                to={routes.categories.path}
                className="flex items-center gap-1"
              >
                Gerenciar
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4 sm:space-y-5 px-4 sm:px-6 py-4 sm:py-6">
            {categoriesIsLoading ? (
              <p className="text-center text-sm text-gray-500 py-2">
                Carregando...
              </p>
            ) : (
              categoryItems.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-2 sm:gap-4"
                >
                  <div className="min-w-0 max-w-[50%] sm:max-w-[60%] lg:max-w-[50%]">
                    <CategoryPill
                      tone={category.color as CategoryTones}
                      label={category.title}
                    />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-auto text-right">
                    <p className="text-xs sm:text-sm text-gray-600">
                      {formatItemsLabel(category.items?.qty ?? 0)}
                    </p>
                    <p className="min-w-[70px] sm:min-w-[88px] text-right text-xs sm:text-sm font-semibold text-gray-800">
                      {formatCentsToBRL(category.items?.amountIncents ?? 0)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default Dashboard;
