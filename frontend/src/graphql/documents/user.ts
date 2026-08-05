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
