import { gql } from "apollo-server-express"

const typeDefs = gql`
  type List {
    uuid: ID!
    name: String!
    isFavorite: Boolean!
  }

  type ListResponse implements QueryResponse {
    code: Int!
    isSuccess: Boolean!
    errors: [Error]!
    values: [List!]
  }

  input UpdateListInput {
    uuid: ID!
    name: String!
  }

  input TaskInput {
    uuid: String
    title: String!
    description: String!
    listId: String!
  }

  type Task {
    uuid: String!
    title: String!
    description: String!
    isDone: Boolean!
  }

  type TaskInfo {
    listName: String!
    tasks: [Task]!
  }

  type TaskResponse implements QueryResponse {
    code: Int!
    isSuccess: Boolean!
    errors: [Error]!
    values: TaskInfo
  }

  extend type Mutation {
    createList(name: String!): MutationResponse! @requireAuth
    toggleIsFavorite(listUuid: String!): MutationResponse! @requireAuth
    updateList(input: UpdateListInput!): MutationResponse! @requireAuth
    deleteList(listUuid: String!): MutationResponse! @requireAuth
    upsertTask(input: TaskInput!): MutationResponse! @requireAuth
    toggleIsDone(taskUuid: String!): MutationResponse! @requireAuth
    deleteTask(taskUuid: String!): MutationResponse! @requireAuth
  }

  extend type Query {
    lists: ListResponse! @requireAuth
    tasks(listUuid: String!): TaskResponse! @requireAuth
  }
`
export default typeDefs