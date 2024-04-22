import { gql } from "apollo-server-express"

const typeDefs = gql`
  type User {
    firstname: String!
    lastname: String!
    email: String!
    username: String
    password: String!
  }

  input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    username: String
    password: String!
    confirmationPassword: String!
  }

  type Mutation {
    createUser(input: UserInput!): MutationResponse!
  }
`

export default typeDefs