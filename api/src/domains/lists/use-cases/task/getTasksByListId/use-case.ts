import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { TaskDomainRepository } from "../../../repositories/implementations/taskDomainRepository"
import { ListDomainRepository } from "../../../repositories/implementations/listDomainRepository"
import { ListNotExistError } from "../../../errors"

type Tasks = {
    uuid: string,
    title: string,
    description: string,
    isDone: boolean
}

type TaskInfo = {
    listName: string,
    tasks: Tasks[]
}

export class TasksUseCase implements BasicUseCase {
    repository: TaskDomainRepository
    listRepository: ListDomainRepository

    constructor(repository: TaskDomainRepository, listRepository: ListDomainRepository) {
        this.repository = repository
        this.listRepository = listRepository
    }

    async execute(listUuid: string): Promise<Result<TaskInfo>> {
        const foundListResult = await this.listRepository.findOneByUuid(listUuid)

        if (foundListResult.isFailure === true) {
            return Result.fail(new ListNotExistError())
        }

        const list = foundListResult.getValue()

        const foundAllTasksResult = await this.repository.findAllTasksByListUuid(listUuid)
        const tasks: Tasks[] = []

        for (const task of foundAllTasksResult.getValue()) {
            tasks.push({
                uuid: task.uuid,
                title: task.title,
                description: task.description,
                isDone: task.isDone
            })
        }

        return Result.ok({
            listName: list.name,
            tasks
        })
    }
}