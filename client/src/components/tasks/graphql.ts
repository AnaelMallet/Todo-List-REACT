import { gql } from "@apollo/client"

const upsertTaskMutation = gql`
  mutation UpsertTask($input: TaskInput!) {
    upsertTask(input: $input) {
      code
      isSuccess
      errors {
        field
        message
      }
    }
  }
`

const getListTasksQuery = gql`
    query Tasks($listUuid: String!) {
        tasks(listUuid: $listUuid) {
            code,
            isSuccess,
            errors {
                field,
                message
            },
            values {
                listName
                tasks {
                    uuid
                    title
                    description
                    isDone
                }
            }
        }
    }
`

const toggleTaskIsDoneMutation = gql`
mutation ToggleIsDone($taskUuid: String!) {
  toggleIsDone(taskUuid: $taskUuid) {
    code
    errors {
      message
      field
    }
    isSuccess
  }
}
`

const deleteTaskMutation = gql`
mutation DeleteTask($taskUuid: String!) {
  deleteTask(taskUuid: $taskUuid) {
    code
    errors {
      message
      field
    }
    isSuccess
  }
}
`

export {
    upsertTaskMutation,
    getListTasksQuery,
    toggleTaskIsDoneMutation,
    deleteTaskMutation
}