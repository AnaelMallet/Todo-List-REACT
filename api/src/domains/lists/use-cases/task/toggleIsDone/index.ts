import { taskDomainRepository } from "../../../repositories/implementations"

import { ToggleDoneTaskController } from "./controller"
import { ToggleDoneTaskUseCase } from "./use-case"

const toggleDoneTaskUseCase = new ToggleDoneTaskUseCase(taskDomainRepository)
const toggleDoneTaskController = new ToggleDoneTaskController(toggleDoneTaskUseCase)

export {
    toggleDoneTaskUseCase,
    toggleDoneTaskController
}