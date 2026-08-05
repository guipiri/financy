import { gql } from '../generated';

export const CREATE_TRANSACTION_MUTATION = gql(`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
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
