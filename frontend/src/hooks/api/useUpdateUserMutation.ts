import { useMutation } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { UPDATE_USER_MUTATION } from '@/graphql/documents/user';
import type { UpdateUserInput } from '@/graphql/generated/graphql';

export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: (data: UpdateUserInput) =>
      graphqlClient.request(UPDATE_USER_MUTATION, { data }),
  });
}
