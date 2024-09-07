import { gql } from "@apollo/client";

export const updateUserMutation = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      code
      isSuccess
      errors {
        field
        message
      }
    }
  }
`