import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { ListDomainRepository } from "../../../repositories/implementations/listDomainRepository"
import { TaskDomainRepository } from "../../../repositories/implementations/taskDomainRepository"
import { ListNotExistError, UndoneTaskFoundError } from "../../../errors"

export class DeleteListUseCase implements BasicUseCase {
  repository: ListDomainRepository
  taskRepository: TaskDomainRepository

  constructor(
    repository: ListDomainRepository,
    taskRepository: TaskDomainRepository
  ) {
    this.repository = repository
    this.taskRepository = taskRepository
  }
  
  async execute(listId: string): Promise<Result<void>> {
      const foundListResult = await this.repository.findOneByUuid(listId)

      if (foundListResult.isSuccess === false) {
        return Result.fail(new ListNotExistError())
      }

      const undoneTasksNumberResult = await this.taskRepository.countUndoneTasksByListUuid(listId)
      const undoneTasksNumber = undoneTasksNumberResult.getValue()

      if (undoneTasksNumber >= 1) {
        return Result.fail(new UndoneTaskFoundError())
      }

      await this.repository.deleteOneByUuid(listId)

      return Result.ok()
  }
}