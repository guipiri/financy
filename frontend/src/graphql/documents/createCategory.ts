import { gql } from '../generated';

export const CREATE_CATEGORY_MUTATION = gql(`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      title
      description
      color
      iconKey
    }
  }
`);