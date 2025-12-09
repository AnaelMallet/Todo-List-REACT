import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { TaskNotExistError } from "../../../errors"
import { TaskDomainRepository } from "../../../repositories/implementations/taskDomainRepository"

export class DeleteTaskUseCase implements BasicUseCase {
    repository: TaskDomainRepository

    constructor(repository: TaskDomainRepository) {
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