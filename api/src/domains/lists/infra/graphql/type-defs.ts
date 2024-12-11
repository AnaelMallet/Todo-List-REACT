import { gql } from "apollo-server-express"

const typeDefs = gql`
  type List {
    uuid: ID
    name: String!
    isFavorite: Boolean!
    userId: String!
  }

  input ListInput {
    name: String!
    isFavorite: Boolean!
  }

  extend type Mutation {
    createList(input: ListInput!): MutationResponse! @requireAuth
  }
`
export default typeDefs