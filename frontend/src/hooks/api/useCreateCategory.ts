import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { CREATE_CATEGORY_MUTATION } from '@/graphql/documents/createCategory';
import type { CreateCategoryInput } from '@/graphql/generated/graphql';
import { categoriesForDashboardQueryKey } from './useCategories';

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => {
      return graphqlClient.request(CREATE_CATEGORY_MUTATION, { data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoriesForDashboardQueryKey,
      });
    },
  });
}