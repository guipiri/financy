import { gql } from '../generated';

export const UPDATE_CATEGORY_MUTATION = gql(`
  mutation UpdateCategory($id: String!, $data: UpdateCategoryInput!) {
    updateCategory(id: $id, data: $data) {
      id
      title
      description
      color
      iconKey
    }
  }
`);
