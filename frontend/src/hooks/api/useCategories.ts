import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { FETCH_CATEGORIES_FOR_DASHBOARD_QUERY } from '@/graphql/documents/categories';
import type { FetchCategoriesForDashboardQuery } from '@/graphql/generated/graphql';

export const categoriesForDashboardQueryKey = [
  'categories-for-dashboard',
] as const;

export function useFetchCategoriesForDashboardQuery() {
  return useQuery<FetchCategoriesForDashboardQuery>({
    queryKey: categoriesForDashboardQueryKey,
    queryFn: () => {
      return graphqlClient.request(FETCH_CATEGORIES_FOR_DASHBOARD_QUERY);
    },
  });
}
