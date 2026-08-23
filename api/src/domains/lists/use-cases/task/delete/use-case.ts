import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { TaskNotExistError } from "../../../errors"
import { ITaskDomainRepository } from "../../../repositories/I_TaskDomainRepository"

export class DeleteTaskUseCase implements BasicUseCase {
    repository: ITaskDomainRepository

    constructor(repository: ITaskDomainRepository) {
        this.repository = repository
    }

    async execute(taskId: any): Promise<Result<any>> {
        const foundTaskResult = await this.repository.findOneByUuid(taskId)

        if (foundTaskResult.isFailure) {
            return Result.fail(new TaskNotExistError)
        }

        await this.repository.deleteOneByUuid(taskId)

        return Result.ok()
    }
}