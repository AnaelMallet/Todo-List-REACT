import BasicRepository from "@shared/basicRepository"

import TaskEntity from "../../entities/task"

import { ITaskRepository } from "../I_task"

export class TaskRepository extends BasicRepository<TaskEntity> implements ITaskRepository {
    alias = "tasks"

    async findOneByUuid(uuid: string): Promise<TaskEntity> {
        return await this.repository
        .createQueryBuilder(this.alias)
        .innerJoinAndSelect(`${this.alias}.list`, "list_tasks")
        .where(`${this.alias}.uuid = :uuid`, { uuid })
        .getOne()
    }

    async findAllTasksByListUuid(uuid: string): Promise<TaskEntity[]> {
        return await this.repository
        .createQueryBuilder(this.alias)
        .where(`${this.alias}.list_uuid = :uuid`, { uuid })
        .innerJoinAndSelect(`${this.alias}.list`, "list_tasks")
        .addOrderBy(`${this.alias}.is_done`, "ASC")
        .addOrderBy(`${this.alias}.title`, "ASC")
        .getMany()
    }

    async countUndoneTasksByListUuid(uuid: string): Promise<number> {
        return await this.repository
        .createQueryBuilder(this.alias)
        .select("uuid")
        .where(`${this.alias}.list_uuid = :uuid`, { uuid })
        .andWhere(`${this.alias}.is_done = false`)
        .innerJoinAndSelect(`${this.alias}.list`, "list_tasks")
        .getCount()
    }

    async deleteOneByUuid(uuid: string): Promise<void> {
        await this.repository
        .createQueryBuilder(this.alias)
        .delete()
        .from(TaskEntity)
        .where(`${this.alias}.uuid = :uuid`, { uuid })
        .execute()
    }

    async save(entity: TaskEntity): Promise<void> {
        await this.repository.save(entity)
    }
}