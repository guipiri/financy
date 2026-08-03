import { gql } from '../generated';

export const SIGN_UP_MUTATION = gql(`
  mutation SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      accessToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`);

export const SIGN_IN_MUTATION = gql(`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data) {
      accessToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`);

