import { graphqlProps } from "@shared/basicResolvers"

import { createListController } from "../../use-cases/createList"

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
  }
}

export default resolvers