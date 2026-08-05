import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { CREATE_TRANSACTION_MUTATION } from '@/graphql/documents/createTransaction';
import type { CreateTransactionInput } from '@/graphql/generated/graphql';
import {
  transactionsPageQueryKey,
  transactionsQueryKey,
} from './useTransactions';

export function useCreateTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionInput) => {
      return graphqlClient.request(CREATE_TRANSACTION_MUTATION, { data });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionsPageQueryKey }),
      ]);
    },
  });
}
