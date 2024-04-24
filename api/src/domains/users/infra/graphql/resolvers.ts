import { createUserController } from "../../use-cases/createUser"
import { updateUserController } from "../../use-cases/updateUser"

export type graphqlProps = {
  parent: any
  args: any
  context: any
  info: any
}

const resolvers = {
  Mutation: {
    createUser: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await createUserController.executeImplementation(props)
    },
    updateUser: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await updateUserController.executeImplementation(props)
    }
  }
}

export default resolvers