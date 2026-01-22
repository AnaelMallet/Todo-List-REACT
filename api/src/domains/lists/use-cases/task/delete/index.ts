import { taskDomainRepository } from "../../../repositories/implementations"

import { DeleteTaskController } from "./controller"
import { DeleteTaskUseCase } from "./use-case"

const deleteTaskUseCase = new DeleteTaskUseCase(taskDomainRepository)
const deleteTaskController = new DeleteTaskController(deleteTaskUseCase)

export {
    deleteTaskUseCase,
    deleteTaskController
}