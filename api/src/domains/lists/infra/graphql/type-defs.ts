import { gql } from "apollo-server-express"

const typeDefs = gql`
  type List {
    uuid: ID!
    name: String!
    isFavorite: Boolean!
  }

  input ListInput {
    uuid: ID
    name: String
    isFavorite: Boolean
  }

  type ListResponse implements QueryResponse {
    code: Int!
    isSuccess: Boolean!
    errors: [Error]!
    values: [List]!
  }

  input UpdateListInput {
    uuid: ID!
    name: String!
  }

  extend type Mutation {
    createList(input: ListInput!): MutationResponse! @requireAuth
    toggleIsFavorite(listUuid: String!): MutationResponse! @requireAuth
    updateList(input: UpdateListInput!): MutationResponse! @requireAuth
  }

  extend type Query {
    lists: ListResponse! @requireAuth
  }
`
export default typeDefs