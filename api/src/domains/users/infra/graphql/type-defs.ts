import { gql } from "apollo-server-express"

const typeDefs = gql`
  type User {
    uuid: ID
    firstname: String!
    lastname: String!
    email: String!
    username: String
    password: String!
    accessToken: String
    refreshToken: String
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
    uuid: ID!
    firstname: String
    lastname: String
    email: String
    username: String
    password: String
  }

  input LoginInput {
    login: String!
    password: String!
  }

  type LoginResponseData {
    userId: String!
    accessToken: String!
  }

  type LoginResponse implements QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
    values: LoginResponseData
  }

  type TokenResponseData {
    accessToken: String
  }

  type TokenResponse implements QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
    values: TokenResponseData
  }

  type UserData {
    firstname: String!
    lastname: String!
    email: String!
    username: String
  }

  type UserResponse implements QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
    values: UserData
  }

  type Mutation {
    createUser(input: UserInput!): MutationResponse!
    updateUser(input: UserUpdateInput!): MutationResponse!
    login(input: LoginInput!): LoginResponse!
    verifyToken(userId: String!): TokenResponse!
  }

  extend type Query {
    me(userId: String): UserResponse!
  }
`

export default typeDefs