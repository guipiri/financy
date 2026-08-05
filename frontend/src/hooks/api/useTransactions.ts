import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import {
  FETCH_TRANSACTIONS_PAGE_QUERY,
  FETCH_TRANSACTIONS_QUERY,
  FETCH_TRANSACTIONS_SUMMARY_QUERY,
} from '@/graphql/documents/transactions';
import type {
  FetchTransactionsPageQuery,
  FetchTransactionsPageQueryVariables,
  FetchTransactionsQuery,
  FetchTransactionsSummaryQuery,
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
export const transactionsSummaryQueryKey = ['transactions-summary'] as const;

export function useFetchTransactionsSummaryQuery() {
  return useQuery<FetchTransactionsSummaryQuery>({
    queryKey: transactionsSummaryQueryKey,
    queryFn: () => {
      return graphqlClient.request(FETCH_TRANSACTIONS_SUMMARY_QUERY);
    },
  });
}

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
