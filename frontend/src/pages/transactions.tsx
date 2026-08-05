import {
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Search,
  SquarePen,
  Trash,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CategoryColorsMapper, CategoryIconsMapper } from '@/constants';
import type { TransactionType } from '@/graphql/generated/graphql';
import { useFetchCategoriesForDashboardQuery } from '@/hooks/api/useCategories';
import { useFetchTransactionsPageQuery } from '@/hooks/api/useTransactions';
import { cn, formatCentsToBRL } from '@/lib/utils';
import type { CategoryIcons, CategoryTones } from '@/types/category';
import { CategoryPill } from './dashboard';

const PER_PAGE = 10;

type PeriodOption = {
  label: string;
  value: string;
  dateFrom?: string;
  dateTo?: string;
};

function buildPeriodOptions(): PeriodOption[] {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
  const today = new Date();

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - index, 1);
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    return {
      label: formatter
        .format(date)
        .replace(/^./, (letter) => letter.toUpperCase()),
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      dateFrom: date.toISOString(),
      dateTo: new Date(nextMonth.getTime() - 1).toISOString(),
    };
  });

  return [{ label: 'Todos os períodos', value: 'all' }, ...months];
}

function getCategoryTone(categoryColor?: string | null) {
  return (categoryColor || 'blue') as CategoryTones;
}

function getToneClasses(tone: CategoryTones) {
  const [bgClass, textClass] = CategoryColorsMapper[tone].light.split(' ');

  return { bgClass, textClass };
}

function formatDate(dateValue: unknown) {
  return new Date(dateValue as string).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

function formatTransactionAmount(amountInCents: number, type: TransactionType) {
  const prefix = type === 'INCOME' ? '+ ' : '- ';

  return `${prefix}${formatCentsToBRL(amountInCents)}`;
}

function TypeIndicator({ type }: { type: TransactionType }) {
  const isIncome = type === 'INCOME';
  const Icon = isIncome ? CircleArrowUp : CircleArrowDown;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 text-[14px] font-medium leading-5',
        isIncome ? 'text-green-dark' : 'text-red-dark',
      )}
    >
      <Icon className="size-4" />
      {isIncome ? 'Entrada' : 'Saída'}
    </div>
  );
}

function TransactionIcon({
  iconKey,
  tone,
}: {
  iconKey?: string | null;
  tone: CategoryTones;
}) {
  const Icon =
    CategoryIconsMapper[(iconKey as CategoryIcons) || 'briefcase-business'] ||
    CategoryIconsMapper['briefcase-business'];
  const { bgClass, textClass } = getToneClasses(tone);

  return (
    <div
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-lg',
        bgClass,
      )}
    >
      <Icon className={cn('size-4', textClass)} />
    </div>
  );
}

function ActionButton({
  label,
  variant = 'default',
  children,
}: {
  label: string;
  variant?: 'default' | 'danger';
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      className="size-8 rounded-lg border-gray-300 bg-white text-gray-600 shadow-none hover:bg-gray-50"
    >
      <span className={variant === 'danger' ? 'text-danger' : 'text-gray-600'}>
        {children}
      </span>
    </Button>
  );
}

export default function TransactionsPage() {
  const periodOptions = useMemo(() => buildPeriodOptions(), []);
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'ALL' | TransactionType>('ALL');
  const [categoryId, setCategoryId] = useState('ALL');
  const [period, setPeriod] = useState('all');
  const [page, setPage] = useState(1);

  const selectedPeriod = periodOptions.find(
    (option) => option.value === period,
  );
  const filters = {
    page,
    perPage: PER_PAGE,
    ...(search.trim() && { search: search.trim() }),
    ...(type !== 'ALL' && { type }),
    ...(categoryId !== 'ALL' && { categoryId }),
    ...(selectedPeriod?.dateFrom && { dateFrom: selectedPeriod.dateFrom }),
    ...(selectedPeriod?.dateTo && { dateTo: selectedPeriod.dateTo }),
  };

  const { data: categoriesData, isLoading: categoriesLoading } =
    useFetchCategoriesForDashboardQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useFetchTransactionsPageQuery(filters);

  const transactions = transactionsData?.transactionsPage.items ?? [];
  const total = transactionsData?.transactionsPage.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const firstResult = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const lastResult = Math.min(page * PER_PAGE, total);

  const resetPage = () => setPage(1);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-[24px] font-bold leading-8 tracking-tight text-gray-800">
            Transações
          </h1>
          <p className="text-[16px] leading-6 text-gray-600">
            Gerencie todas as suas transações financeiras
          </p>
        </div>

        <Button
          type="button"
          className="h-9 gap-2 rounded-lg bg-[#1f6f43] px-3 text-sm font-medium text-white shadow-none hover:bg-[#1f6f43]/90 sm:my-auto"
        >
          <Plus className="size-4" />
          Nova transação
        </Button>
      </header>

      <Card className="grid gap-4 rounded-[12px] border-gray-200 bg-white p-[25px] shadow-xs md:grid-cols-2 xl:grid-cols-4">
        <Field>
          <Label>Buscar</Label>
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
            startIcon={<Search />}
            placeholder="Buscar por descrição"
            className="h-[38px] py-2.5 text-[14px]"
          />
        </Field>

        <Field>
          <Label>Tipo</Label>
          <Select
            value={type}
            onChange={(event) => {
              setType(event.target.value as 'ALL' | TransactionType);
              resetPage();
            }}
          >
            <option value="ALL">Todos</option>
            <option value="INCOME">Entradas</option>
            <option value="EXPENSE">Saídas</option>
          </Select>
        </Field>

        <Field>
          <Label>Categoria</Label>
          <Select
            value={categoryId}
            disabled={categoriesLoading}
            onChange={(event) => {
              setCategoryId(event.target.value);
              resetPage();
            }}
          >
            <option value="ALL">Todas</option>
            {categoriesData?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Período</Label>
          <Select
            value={period}
            onChange={(event) => {
              setPeriod(event.target.value);
              resetPage();
            }}
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </Card>

      <Card className="overflow-hidden rounded-[12px] border-gray-200 bg-white p-0 sm:p-0 shadow-xs">
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-28 text-center">Data</TableHead>
                <TableHead className="w-[200px] text-center">
                  Categoria
                </TableHead>
                <TableHead className="w-[136px] text-center">Tipo</TableHead>
                <TableHead className="w-[200px] text-right">Valor</TableHead>
                <TableHead className="w-[120px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-600">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-600">
                    Nenhuma transação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => {
                  const tone = getCategoryTone(transaction.category?.color);

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <TransactionIcon
                            iconKey={transaction.category?.iconKey}
                            tone={tone}
                          />
                          <p className="min-w-0 truncate text-[16px] font-medium leading-6 text-gray-800">
                            {transaction.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-[14px] leading-5 text-gray-600">
                        {formatDate(transaction.date)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <CategoryPill
                            tone={tone}
                            label={
                              transaction.category?.title || 'Sem categoria'
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <TypeIndicator type={transaction.type} />
                      </TableCell>
                      <TableCell className="text-right text-[14px] font-semibold leading-5 text-gray-800">
                        {formatTransactionAmount(
                          transaction.amountInCents,
                          transaction.type,
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <ActionButton
                            label={`Excluir transação ${transaction.description}`}
                            variant="danger"
                          >
                            <Trash className="size-4" />
                          </ActionButton>
                          <ActionButton
                            label={`Editar transação ${transaction.description}`}
                          >
                            <SquarePen className="size-4" />
                          </ActionButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="divide-y divide-gray-200 lg:hidden">
          {transactionsLoading ? (
            <p className="p-6 text-center text-gray-600">Carregando...</p>
          ) : transactions.length === 0 ? (
            <p className="p-6 text-center text-gray-600">
              Nenhuma transação encontrada
            </p>
          ) : (
            transactions.map((transaction) => {
              const tone = getCategoryTone(transaction.category?.color);

              return (
                <div key={transaction.id} className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <TransactionIcon
                      iconKey={transaction.category?.iconKey}
                      tone={tone}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[16px] font-medium leading-6 text-gray-800">
                            {transaction.description}
                          </p>
                          <p className="text-[14px] leading-5 text-gray-600">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                        <p className="shrink-0 text-right text-[14px] font-semibold leading-5 text-gray-800">
                          {formatTransactionAmount(
                            transaction.amountInCents,
                            transaction.type,
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <CategoryPill
                          tone={tone}
                          label={transaction.category?.title || 'Sem categoria'}
                        />
                        <TypeIndicator type={transaction.type} />
                      </div>

                      <div className="mt-4 flex justify-end gap-2">
                        <ActionButton
                          label={`Excluir transação ${transaction.description}`}
                          variant="danger"
                        >
                          <Trash className="size-4" />
                        </ActionButton>
                        <ActionButton
                          label={`Editar transação ${transaction.description}`}
                        >
                          <SquarePen className="size-4" />
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <footer className="flex flex-col gap-4 border-t border-gray-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[14px] leading-5 text-gray-700">
            <span className="font-medium">{firstResult}</span> a{' '}
            <span className="font-medium">{lastResult}</span> |{' '}
            <span className="font-medium">{total}</span> resultados
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={page === 1}
              aria-label="Página anterior"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="size-8 rounded-lg border-gray-300 bg-white shadow-none"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {Array.from(
              { length: Math.min(totalPages, 3) },
              (_, index) => index + 1,
            ).map((pageNumber) => (
              <Button
                key={pageNumber}
                type="button"
                variant={pageNumber === page ? 'default' : 'outline'}
                size="icon"
                onClick={() => setPage(pageNumber)}
                className={cn(
                  'size-8 rounded-lg shadow-none',
                  pageNumber === page
                    ? 'bg-[#1f6f43] text-white hover:bg-[#1f6f43]/90'
                    : 'border-gray-300 bg-white text-gray-700',
                )}
              >
                {pageNumber}
              </Button>
            ))}

            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              aria-label="Próxima página"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="size-8 rounded-lg border-gray-300 bg-white shadow-none"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </footer>
      </Card>
    </div>
  );
}
