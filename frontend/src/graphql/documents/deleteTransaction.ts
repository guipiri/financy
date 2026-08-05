import { gql } from '../generated';

export const DELETE_TRANSACTION_MUTATION = gql(`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`);
