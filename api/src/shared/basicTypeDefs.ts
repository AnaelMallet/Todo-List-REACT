import { gql } from "apollo-server-express"

const basicTypeDefs = gql`
  type Query {
    helloFresh: String
  }
`
export default basicTypeDefs