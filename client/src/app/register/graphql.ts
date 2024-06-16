import { gql } from "@apollo/client"

export const createUserMutation = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      code
      isSuccess
      errors {
        field
        message
      }
    }
  }
`