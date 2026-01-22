import { BasicTransformer } from "@shared/basicTransformer"
import { Result } from "@shared/Results"

import TaskEntity from "../infra/databases/entities/task"
import ListEntity from "../infra/databases/entities/list"
import { Task, TaskProps } from "../entities/task"

export class TaskTransformer extends BasicTransformer<Task, TaskEntity> {
    arrayToDomain(databaseEntities: TaskEntity[]): Result<Task[]> {
        const domainTasks: Task[] = []

        for (const databaseEntity of databaseEntities) {
            const domainTask = this.toDomain(databaseEntity)

            domainTasks.push(domainTask.getValue())
        }

        return Result.ok(domainTasks)
    }

    toDomain(databaseEntity: TaskEntity): Result<Task> {
        const props: TaskProps = {
            listId: databaseEntity.list.uuid,
            title: databaseEntity.title,
            description: databaseEntity.description,
            isDone: databaseEntity.isDone
        }

        const task = Task.create(props, databaseEntity.uuid)

        return task
    }

    toDatabase(domainEntity: Task): TaskEntity {
        const entityTask = new TaskEntity()
        const listEntity = new ListEntity()

        listEntity.uuid = domainEntity.listId

        entityTask.uuid = domainEntity.uuid
        entityTask.title = domainEntity.title
        entityTask.description = domainEntity.description
        entityTask.isDone = domainEntity.isDone
        entityTask.list = listEntity

        return entityTask
    }
}