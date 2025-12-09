import { Result } from "@shared/Results"

import { Task } from "../../entities/task"
import { TaskRepository } from "../../infra/databases/repositories/implementations/task"
import { taskTransformer } from "../../transformers"

import { ITaskDomainRepository } from "../I_TaskDomainRepository"

export class TaskDomainRepository implements ITaskDomainRepository {
    repository: TaskRepository

    constructor(repository: TaskRepository) {
        this.repository = repository
    }

    async findOneByUuid(uuid: string): Promise<Result<Task>> {
        const task = await this.repository.findOneByUuid(uuid)

        if (task === null) {
            return Result.fail()
        }

        return taskTransformer.toDomain(task)
    }

    async findAllTasksByListUuid(uuid: string): Promise<Result<Task[]>> {
        const tasks = await this.repository.findAllTasksByListUuid(uuid)
        const domainTasks = taskTransformer.arrayToDomain(tasks)

        return domainTasks
    }

    async countUndoneTasksByListUuid(uuid: string): Promise<Result<number>> {
        const foundTasksNumber = await this.repository.countUndoneTasksByListUuid(uuid)

        return Result.ok(foundTasksNumber)
    }

    async deleteOneByUuid(uuid: string): Promise<void> {
        await this.repository.deleteOneByUuid(uuid)
    }

    async save(props: Task): Promise<void> {
        const task = taskTransformer.toDatabase(props)

        await this.repository.save(task)
    }
}