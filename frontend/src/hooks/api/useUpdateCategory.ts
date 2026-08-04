import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { UPDATE_CATEGORY_MUTATION } from '@/graphql/documents/updateCategory';
import type { UpdateCategoryInput } from '@/graphql/generated/graphql';
import { categoriesForDashboardQueryKey } from './useCategories';

interface UpdateCategoryVariables {
  id: string;
  data: UpdateCategoryInput;
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryVariables) => {
      return graphqlClient.request(UPDATE_CATEGORY_MUTATION, { id, data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoriesForDashboardQueryKey,
      });
    },
  });
}
