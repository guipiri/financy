import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { DELETE_CATEGORY_MUTATION } from '@/graphql/documents/deleteCategory';
import { categoriesForDashboardQueryKey } from './useCategories';
import {
  transactionsPageQueryKey,
  transactionsQueryKey,
  transactionsSummaryQueryKey,
} from './useTransactions';

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return graphqlClient.request(DELETE_CATEGORY_MUTATION, { id });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: categoriesForDashboardQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: transactionsPageQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: transactionsSummaryQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: transactionsQueryKey,
        }),
      ]);
    },
  });
}
