import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import {
  FETCH_TRANSACTIONS_PAGE_QUERY,
  FETCH_TRANSACTIONS_QUERY,
} from '@/graphql/documents/transactions';
import type {
  FetchTransactionsPageQuery,
  FetchTransactionsPageQueryVariables,
  FetchTransactionsQuery,
} from '@/graphql/generated/graphql';

export function useFetchTransactionsQuery() {
  return useQuery<FetchTransactionsQuery>({
    queryKey: ['transactions'],
    queryFn: () => {
      return graphqlClient.request(FETCH_TRANSACTIONS_QUERY);
    },
  });
}

export const transactionsQueryKey = ['transactions'] as const;
export const transactionsPageQueryKey = ['transactions-page'] as const;

export function useFetchTransactionsPageQuery(
  filters: FetchTransactionsPageQueryVariables['filters'],
) {
  return useQuery<FetchTransactionsPageQuery>({
    queryKey: [...transactionsPageQueryKey, filters],
    queryFn: () => {
      return graphqlClient.request(FETCH_TRANSACTIONS_PAGE_QUERY, { filters });
    },
  });
}
