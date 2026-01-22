import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { Task } from "../../../entities/task"
import { TaskDomainRepository } from "../../../repositories/implementations/taskDomainRepository"

import { TaskPropsDto } from "./dto"

export class CreateTaskUseCase implements BasicUseCase {
    repository: TaskDomainRepository

    constructor(repository: TaskDomainRepository) {
        this.repository = repository
    }

    async execute(props: TaskPropsDto): Promise<Result<void>> {
        const {
            uuid,
            title,
            description,
            listId
        } = props

        const taskResult = Task.create({
            title,
            description,
            listId
        }, uuid)

        if (taskResult.isFailure === true) {
            return Result.fail(taskResult.getErrors())
        }

        const task = taskResult.getValue()

        await this.repository.save(task)

        return Result.ok()
    }
}