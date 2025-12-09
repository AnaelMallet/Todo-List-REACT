import {
    listDomainRepository,
    taskDomainRepository
} from "../../../repositories/implementations"

import { TasksController } from "./controller"
import { TasksUseCase } from "./use-case"

const tasksUseCase = new TasksUseCase(taskDomainRepository, listDomainRepository)
const tasksController = new TasksController(tasksUseCase)

export {
    tasksUseCase,
    tasksController
}