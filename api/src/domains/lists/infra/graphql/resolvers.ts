import { graphqlProps } from "@shared/basicResolvers"

import { createListController } from "../../use-cases/createList"
import { listsController } from "../../use-cases/lists"

const resolvers = {
  Mutation: {
    createList: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await createListController.executeImplementation(props)
    }
  },
  Query: {
    lists: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await listsController.executeImplementation(props)
    }
  }
}

export default resolvers