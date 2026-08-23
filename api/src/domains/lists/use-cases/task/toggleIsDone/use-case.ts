import { BasicUseCase } from "@shared/basicUseCase"

import { ITaskDomainRepository } from "../../../repositories/I_TaskDomainRepository"
import { Result } from "@shared/Results"
import { TaskNotExistError } from "src/domains/lists/errors"

export class ToggleDoneTaskUseCase implements BasicUseCase {
    repository: ITaskDomainRepository

    constructor(repository: ITaskDomainRepository) {
        this.repository = repository
    }

    async execute(taskUuid: string): Promise<Result<void>> {
        const foundTaskResult = await this.repository.findOneByUuid(taskUuid)

        if (foundTaskResult.isFailure) {
            return Result.fail(new TaskNotExistError())
        }

        const task = foundTaskResult.getValue()

        task.toggleIsDone()

        await this.repository.save(task)

        return Result.ok()
    }
}