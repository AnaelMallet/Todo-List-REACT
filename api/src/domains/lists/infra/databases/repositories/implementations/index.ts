import ListEntity from "../../entities/list"
import TaskEntity from "../../entities/task"

import { ListRepository } from "./list"
import { TaskRepository } from "./task"

const listRepository = new ListRepository(ListEntity)
const taskRepository = new TaskRepository(TaskEntity)

export {
  listRepository,
  taskRepository
}