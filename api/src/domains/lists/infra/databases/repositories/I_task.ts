import TaskEntity from "../entities/task"

export interface ITaskRepository {
    findOneByUuid(uuid: string): Promise<TaskEntity | null>
    findAllTasksByListUuid(listId: string): Promise<TaskEntity[]>
    countUndoneTasksByListUuid(listId: string): Promise<number>
    deleteOneByUuid(uuid: string): Promise<void>
    save(props: any): Promise<void>
}