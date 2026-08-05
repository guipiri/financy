import { gql } from '../generated';

export const ME_QUERY = gql(`
  query Me {
    me {
      id
      name
      email
    }
  }
`);

export const UPDATE_USER_MUTATION = gql(`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      name
    }
  }
`);
