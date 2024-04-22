import { createUserController, createUserUseCase } from "../../use-cases/createUser"

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
    }
  }
}

export default resolvers