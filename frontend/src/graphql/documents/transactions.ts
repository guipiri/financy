import { gql } from "../generated";

export const FETCH_TRANSACTIONS_QUERY = gql(`
  query FetchTransactions {
    transactions {
      id
      description
      amountInCents
      type
      date
      category {
        title
        iconKey
        color
      }
    }
  }
`);