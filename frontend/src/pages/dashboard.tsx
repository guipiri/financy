import {
  ArrowDownCircle,
  ArrowRight,
  ArrowUpCircle,
  BriefcaseBusiness,
  CarFront,
  ChevronRight,
  PiggyBank,
  Plus,
  ShoppingCart,
  Utensils,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SummaryCard = {
  title: string;
  value: string;
  icon: typeof Wallet;
  iconClassName: string;
};

type Transaction = {
  title: string;
  date: string;
  category: string;
  categoryTone: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'yellow';
  amount: string;
  amountTone: 'positive' | 'negative';
  icon: typeof BriefcaseBusiness;
  iconBgClassName: string;
};

type Category = {
  label: string;
  items: string;
  amount: string;
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'yellow';
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

const transactions: Transaction[] = [
  {
    title: 'Pagamento de Salário',
    date: '01/12/25',
    category: 'Receita',
    categoryTone: 'green',
    amount: '+ R$ 4.250,00',
    amountTone: 'positive',
    icon: BriefcaseBusiness,
    iconBgClassName: 'bg-green-light',
  },
  {
    title: 'Jantar no Restaurante',
    date: '30/11/25',
    category: 'Alimentação',
    categoryTone: 'blue',
    amount: '- R$ 89,50',
    amountTone: 'negative',
    icon: Utensils,
    iconBgClassName: 'bg-blue-light',
  },
  {
    title: 'Posto de Gasolina',
    date: '29/11/25',
    category: 'Transporte',
    categoryTone: 'purple',
    amount: '- R$ 100,00',
    amountTone: 'negative',
    icon: CarFront,
    iconBgClassName: 'bg-purple-light',
  },
  {
    title: 'Compras no Mercado',
    date: '28/11/25',
    category: 'Mercado',
    categoryTone: 'orange',
    amount: '- R$ 156,80',
    amountTone: 'negative',
    icon: ShoppingCart,
    iconBgClassName: 'bg-orange-light',
  },
  {
    title: 'Retorno de Investimento',
    date: '26/11/25',
    category: 'Investimento',
    categoryTone: 'green',
    amount: '+ R$ 340,25',
    amountTone: 'positive',
    icon: PiggyBank,
    iconBgClassName: 'bg-green-light',
  },
];

const categories: Category[] = [
  {
    label: 'Alimentação',
    items: '12 itens',
    amount: 'R$ 542,30',
    tone: 'blue',
  },
  {
    label: 'Transporte',
    items: '8 itens',
    amount: 'R$ 385,50',
    tone: 'purple',
  },
  { label: 'Mercado', items: '3 itens', amount: 'R$ 298,75', tone: 'orange' },
  {
    label: 'Entretenimento',
    items: '2 itens',
    amount: 'R$ 186,20',
    tone: 'pink',
  },
  {
    label: 'Utilidades',
    items: '7 itens',
    amount: 'R$ 245,80',
    tone: 'yellow',
  },
];

const toneClasses: Record<Category['tone'], string> = {
  blue: 'bg-blue-light text-blue-base',
  green: 'bg-green-light text-green-base',
  purple: 'bg-purple-light text-purple-base',
  orange: 'bg-orange-light text-orange-base',
  pink: 'bg-pink-light text-pink-base',
  yellow: 'bg-yellow-light text-yellow-base',
};

function CategoryPill({
  tone,
  label,
}: {
  tone: Category['tone'];
  label: string;
}) {
  return (
    <p
      className={cn(
        'items-center rounded-full px-3 py-1 text-sm font-medium truncate max-w-[100px] shrink-0 text-center',
        toneClasses[tone],
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
  return (
    <main className="min-h-screen bg-gray-100 text-foreground">
      <div className="mx-auto flex flex-col md:grid md:grid-cols-3 md:grid-rows-[auto_1fr] w-full max-w-7xl gap-6 p-4 lg:p-12">
        {summaryCards.map((card) => (
          <Card
            key={card.title}
            className="rounded-[12px] p-4 sm:p-6 shadow-xs"
          >
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

        <Card className="col-span-2 overflow-hidden p-0 sm:p-0 shadow-xs">
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
            {transactions.map((transaction) => (
              <div
                key={`${transaction.title}-${transaction.date}`}
                className="flex min-h-20 items-center px-6 py-4"
              >
                <div className="flex flex-1 items-center gap-4 pr-4">
                  <div
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-lg',
                      transaction.iconBgClassName,
                    )}
                  >
                    <transaction.icon
                      className={cn(
                        'size-4',
                        toneClasses[transaction.categoryTone],
                      )}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-medium leading-6 text-gray-800">
                      {transaction.title}
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <div className="flex w-[160px] justify-center px-4">
                  <CategoryPill
                    tone={transaction.categoryTone}
                    label={transaction.category}
                  />
                </div>

                <div className="flex w-[160px] items-center justify-end gap-2 px-4">
                  <p className="text-sm font-semibold whitespace-nowrap text-gray-800">
                    {transaction.amount}
                  </p>
                  <ArrowRight
                    className={cn(
                      'size-4 shrink-0',
                      transaction.amountTone === 'positive'
                        ? '-rotate-45 text-green-dark'
                        : 'rotate-45 text-red-base',
                    )}
                  />
                </div>
              </div>
            ))}
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
            {categories.map((category) => (
              <div key={category.label} className="flex items-center gap-1">
                <CategoryPill tone={category.tone} label={category.label} />
                <p className="min-w-0 flex-1 text-right text-sm text-gray-600">
                  {category.items}
                </p>
                <p className="w-[88px] text-right text-sm font-semibold text-gray-800">
                  {category.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

export default Dashboard;
