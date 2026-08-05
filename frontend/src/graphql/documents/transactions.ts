import { gql } from '../generated';

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

export const FETCH_TRANSACTIONS_PAGE_QUERY = gql(`
  query FetchTransactionsPage($filters: TransactionFiltersInput) {
    transactionsPage(filters: $filters) {
      total
      page
      perPage
      items {
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
  }
`);

export const FETCH_TRANSACTIONS_SUMMARY_QUERY = gql(`
  query FetchTransactionsSummary {
    transactionsSummary {
      totalBalanceInCents
      monthIncomeInCents
      monthExpenseInCents
    }
  }
`);
