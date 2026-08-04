export type TransactionType = 'INCOME' | 'EXPENSE';

export const TransactionTypeMapper: Record<TransactionType, string> = {
  INCOME: 'Entrada',
  EXPENSE: 'Saída',
};