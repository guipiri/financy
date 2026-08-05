import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { DELETE_TRANSACTION_MUTATION } from '@/graphql/documents/deleteTransaction';
import { categoriesForDashboardQueryKey } from './useCategories';
import {
  transactionsPageQueryKey,
  transactionsQueryKey,
  transactionsSummaryQueryKey,
} from './useTransactions';

export function useDeleteTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return graphqlClient.request(DELETE_TRANSACTION_MUTATION, { id });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: transactionsPageQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: transactionsSummaryQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: transactionsQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: categoriesForDashboardQueryKey,
        }),
      ]);
    },
  });
}
