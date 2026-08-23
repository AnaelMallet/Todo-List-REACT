import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { Task } from "../../../entities/task"
import { ITaskDomainRepository } from "../../../repositories/I_TaskDomainRepository"

import { TaskPropsDto } from "./dto"

export class CreateTaskUseCase implements BasicUseCase {
    repository: ITaskDomainRepository

    constructor(repository: ITaskDomainRepository) {
        this.repository = repository
    }

    async execute(props: TaskPropsDto): Promise<Result<void>> {
        const {
            uuid,
            title,
            description,
            isDone,
            listId
        } = props

        const taskResult = Task.create({
            title,
            description,
            isDone,
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