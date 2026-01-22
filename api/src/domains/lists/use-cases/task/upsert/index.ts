import { taskDomainRepository } from "../../../repositories/implementations"

import { UpsertTaskController } from "./controller"
import { CreateTaskUseCase } from "./create-useCase"
import { UpdateTaskUseCase } from "./update-useCase"

const createTaskUseCase = new CreateTaskUseCase(taskDomainRepository)
const updateTaskUseCase = new UpdateTaskUseCase(taskDomainRepository)
const upsertTaskController = new UpsertTaskController(createTaskUseCase, updateTaskUseCase)

export {
    createTaskUseCase,
    updateTaskUseCase,
    upsertTaskController
}