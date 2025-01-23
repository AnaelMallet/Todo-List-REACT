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

const toggleFavoriteMutation = gql`
  mutation ToggleIsFavorite($listUuid: String!) {
    toggleIsFavorite(listUuid: $listUuid) {
      code
      isSuccess
      errors {
        field
        message
      }
    }
  }
`

const updateListMutation = gql`
  mutation UpdateListName($input: UpdateListInput!) {
    updateList(input: $input) {
      code
      isSuccess
      errors {
        field
        message
      }
    }
  }
`

export {
  createListMutation,
  getUserListsQuery,
  toggleFavoriteMutation,
  updateListMutation
}