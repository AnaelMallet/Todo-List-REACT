import { gql } from "@apollo/client"

export const createListMutation = gql`
  mutation CreateList($input: ListInput!) {
    createList(input: $input) {
      code
      isSuccess
      errors {
        field
        message
      }
    }
  }
` 