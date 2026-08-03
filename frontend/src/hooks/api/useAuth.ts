import { useMutation } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { SIGN_UP_MUTATION } from '@/graphql/documents/auth';
import type { SignUpInput } from '@/graphql/generated/graphql';

export function useSignUpMutation() {
  return useMutation({
    mutationFn: (data: SignUpInput) => {
      return graphqlClient.request(SIGN_UP_MUTATION, { data });
    },
  });
}
