import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { IListDomainRepository } from "../../../repositories/I_ListDomainRepository"
import { ITaskDomainRepository } from "../../../repositories/I_TaskDomainRepository"
import { ListNotExistError, UndoneTaskFoundError } from "../../../errors"

export class DeleteListUseCase implements BasicUseCase {
  repository: IListDomainRepository
  taskRepository: ITaskDomainRepository

  constructor(
    repository: IListDomainRepository,
    taskRepository: ITaskDomainRepository
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