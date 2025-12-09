import { listRepository, taskRepository } from "../../infra/databases/repositories/implementations"

import { ListDomainRepository } from "./listDomainRepository"
import { TaskDomainRepository } from "./taskDomainRepository"

const listDomainRepository = new ListDomainRepository(listRepository)
const taskDomainRepository = new TaskDomainRepository(taskRepository)

export {
  listDomainRepository,
  taskDomainRepository
}