import { gql } from "@apollo/client"

export const verifyTokenMutation = gql`
mutation verifyToken($userId: String!) {
  verifyToken(userId: $userId) {
    code
    isSuccess
    errors {
      field
      message
    }
    values {
      accessToken
    }
  }
}
`

export const getMeQuery = gql`
  query me($userId: String) {
    me(userId: $userId) {
      code
      isSuccess
      errors {
        field
        message
      }
      values {
        firstname
        lastname
        email
        username
      }
    }
  }
`