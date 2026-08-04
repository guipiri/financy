import { graphqlClient } from "@/graphql/client";
import { FETCH_TRANSACTIONS_QUERY } from "@/graphql/documents/transactions";
import type { FetchTransactionsQuery } from "@/graphql/generated/graphql";
import { useQuery } from "@tanstack/react-query";

export function useFetchTransactionsQuery() {
  return useQuery<FetchTransactionsQuery>({
    queryKey: ['transactions'],
    queryFn: () => {
      return graphqlClient.request(FETCH_TRANSACTIONS_QUERY);
    },
  })
}