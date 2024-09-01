import { gql } from "@apollo/client"

export const loginUserMutation = gql `
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      code
      isSuccess
      errors {
        field
        message
      }
      values {
        userId
        accessToken
      }
    }
  }
`
