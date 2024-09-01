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