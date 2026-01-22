import { Result } from "@shared/Results"

import { Task } from "../entities/task"

export interface ITaskDomainRepository {
    findOneByUuid(uuid: string): Promise<Result<Task>>
    findAllTasksByListUuid(listId: string): Promise<Result<Task[]>>
    countUndoneTasksByListUuid(listId: string): Promise<Result<number>>
    deleteOneByUuid(uuid: string): Promise<void>
    save(props: Task): Promise<void>
}