import { gql } from "@apollo/client"

const createListMutation = gql`
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

const getUserListsQuery = gql`
  query Lists {
    lists {
      code
      isSuccess
      errors {
        field
        message
      }
      values {
        uuid
        name
        isFavorite
      }
    }
  }
`

export {
  createListMutation,
  getUserListsQuery
}