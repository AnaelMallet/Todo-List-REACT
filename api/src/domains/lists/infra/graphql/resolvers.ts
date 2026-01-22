import { graphqlProps } from "@shared/basicResolvers"

import { createListController } from "../../use-cases/list/create"
import { listsController } from "../../use-cases/list/getAll"
import { toggleFavoriteListController } from "../../use-cases/list/toggleIsFavorite"
import { updateLIstController } from "../../use-cases/list/update"
import { deleteListController } from "../../use-cases/list/delete"
import { upsertTaskController } from "../../use-cases/task/upsert"
import { tasksController } from "../../use-cases/task/getTasksByListId"
import { toggleDoneTaskController } from "../../use-cases/task/toggleIsDone"
import { deleteTaskController } from "../../use-cases/task/delete"

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
    },
    toggleIsFavorite: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await toggleFavoriteListController.executeImplementation(props)
    },
    updateList: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await updateLIstController.executeImplementation(props)
    },
    deleteList: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await deleteListController.executeImplementation(props)
    },
    upsertTask: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await upsertTaskController.executeImplementation(props)
    },
    toggleIsDone: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await toggleDoneTaskController.executeImplementation(props)
    },
    deleteTask: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await deleteTaskController.executeImplementation(props)
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
    },
    tasks: async(parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await tasksController.executeImplementation(props)
    }
  }
}

export default resolvers