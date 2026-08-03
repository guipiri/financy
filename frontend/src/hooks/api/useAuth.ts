import { useMutation } from '@tanstack/react-query';
import { graphqlClient } from '@/graphql/client';
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from '@/graphql/documents/auth';
import type { SignInInput, SignUpInput } from '@/graphql/generated/graphql';

export function useSignUpMutation() {
  return useMutation({
    mutationFn: (data: SignUpInput) => {
      return graphqlClient.request(SIGN_UP_MUTATION, { data });
    },
  });
}

export function useSignInMutation() {
  return useMutation({
    mutationFn: (data: SignInInput) => {
      return graphqlClient.request(SIGN_IN_MUTATION, { data });
    },
  });
}

