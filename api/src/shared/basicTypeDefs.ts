import { gql } from "apollo-server-express"

const basicTypeDefs = gql`
  type Error {
    field: String!
    message: String!
  }

  type MutationResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
  }

  interface QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
  }

  type Query {
    helloFresh: String
  }
`
export default basicTypeDefs