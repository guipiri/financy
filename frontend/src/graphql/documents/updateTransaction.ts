import { gql } from '../generated';

export const UPDATE_TRANSACTION_MUTATION = gql(`
  mutation UpdateTransaction($id: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, data: $data) {
      id
      description
      amountInCents
      type
      date
      category {
        id
        title
        iconKey
        color
      }
    }
  }
`);
