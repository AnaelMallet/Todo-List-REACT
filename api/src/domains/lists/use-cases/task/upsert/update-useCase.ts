import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { ITaskDomainRepository } from "../../../repositories/I_TaskDomainRepository"
import { TaskNotExistError } from "../../../errors"

import { TaskPropsDto } from "./dto"

export class UpdateTaskUseCase implements BasicUseCase {
    repository: ITaskDomainRepository

    constructor(repository: ITaskDomainRepository) {
        this.repository = repository
    }

    async execute(props: TaskPropsDto): Promise<Result<any>> {
        const {
            uuid,
            title,
            description
        } = props

        const foundTaskResult = await this.repository.findOneByUuid(uuid as string)

        if (foundTaskResult.isFailure) {
            return Result.fail(new TaskNotExistError())
        }

        const task = foundTaskResult.getValue()

        task.updateTitle(title)
        task.updateDescription(description)

        await this.repository.save(task)

        return Result.ok()
    }
}