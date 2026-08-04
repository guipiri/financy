import { gql } from '../generated';

export const FETCH_CATEGORIES_FOR_DASHBOARD_QUERY = gql(`
  query FetchCategoriesForDashboard {
    categories {
      id
      title
      description
      color
      iconKey
      items {
        qty
        amountIncents
      }
    }
  }
`);
