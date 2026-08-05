import { gql } from '../generated';

export const DELETE_CATEGORY_MUTATION = gql(`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`);
