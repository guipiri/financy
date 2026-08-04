import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { FETCH_CATEGORIES_FOR_DASHBOARD_QUERY } from '@/graphql/documents/categories';
import type { FetchCategoriesForDashboardQuery } from '@/graphql/generated/graphql';

export function useFetchCategoriesForDashboardQuery() {
  return useQuery<FetchCategoriesForDashboardQuery>({
    queryKey: ['categories-for-dashboard'],
    queryFn: () => {
      return graphqlClient.request(FETCH_CATEGORIES_FOR_DASHBOARD_QUERY);
    },
  });
}
