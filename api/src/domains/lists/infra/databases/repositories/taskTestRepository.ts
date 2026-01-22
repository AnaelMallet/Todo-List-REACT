import { Result } from "@shared/Results"

import { ITaskDomainRepository } from "../../../repositories/I_TaskDomainRepository"
import { Task } from "../../../entities/task"

export class TaskTestRepository implements ITaskDomainRepository {
    array: Task[] = []
    repository: null

    async findOneByUuid(uuid: string): Promise<Result<Task>> {
        const foundTask = this.array.find(task => task.uuid === uuid)

        if (foundTask === undefined) {
            return Promise.resolve(Result.fail())
        }

        return Promise.resolve(Result.ok(foundTask))
    }

    async findAllTasksByListUuid(listId: string): Promise<Result<Task[]>> {
        const foundTasks = this.array.filter(task => task.listId === listId)

        return Promise.resolve(Result.ok(foundTasks))
    }

    async countUndoneTasksByListUuid(listId: string): Promise<Result<number>> {
        const foundUndoneTasksNumber = this.array.filter(task =>
            task.listId === listId &&
            task.isDone === false
        ).length

        return Promise.resolve(Result.ok(foundUndoneTasksNumber))
    }

    async deleteOneByUuid(uuid: string): Promise<void> {
        this.array.filter(list => list.uuid !== uuid)

        return Promise.resolve()
    }

    save(task: Task): Promise<void> {
        const foundTaskIndex = this.array.findIndex(prop => prop.uuid === task.uuid)

        if (foundTaskIndex !== -1) {
            this.array[foundTaskIndex].props = task.props

            return Promise.resolve()
        }
        
        if (task.hasOwnProperty("isDone")) {
            this.array.push(task)
        } else {
            Object.assign(task.props, { isDone: false })
            
            this.array.push(task)
        }

        return Promise.resolve()
    }
}