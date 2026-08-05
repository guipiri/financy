import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { UPDATE_TRANSACTION_MUTATION } from '@/graphql/documents/updateTransaction';
import type { UpdateTransactionInput } from '@/graphql/generated/graphql';
import {
  transactionsPageQueryKey,
  transactionsQueryKey,
} from './useTransactions';

interface UpdateTransactionVariables {
  id: string;
  data: UpdateTransactionInput;
}

export function useUpdateTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTransactionVariables) => {
      return graphqlClient.request(UPDATE_TRANSACTION_MUTATION, { id, data });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionsPageQueryKey }),
      ]);
    },
  });
}
