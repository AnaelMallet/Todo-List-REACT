import { gql } from "apollo-server-express"

const typeDefs = gql`
  type User {
    uuid: ID
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

  input UserUpdateInput {
    uuid: ID
    firstname: String
    lastname: String
    email: String
    username: String
    password: String
    confirmationPassword: String
  }

  type Mutation {
    createUser(input: UserInput!): MutationResponse!
    updateUser(input: UserUpdateInput!): MutationResponse!
  }
`

export default typeDefs