import BasicRepository from "@shared/basicRepository"

import ListEntity from "../../entities/list"

import { IListRepository } from "../I_list"

export class ListRepository extends BasicRepository<ListEntity> implements IListRepository {
  alias = "lists"
  
  async findAllByUserId(uuid: string): Promise<ListEntity[]> {
    return await this.repository
      .createQueryBuilder(this.alias)
      .innerJoinAndSelect(`${this.alias}.user`, "user_lists")
      .where(`${this.alias}.user_uuid = :uuid`, { uuid })
      .addOrderBy(`${this.alias}.is_favorite`, "DESC")
      .addOrderBy(`${this.alias}.name`, "ASC")
      .getMany()
  }

  async findOneByUuid(uuid: string): Promise<ListEntity | null> {
      return await this.repository
        .createQueryBuilder(this.alias)
        .innerJoinAndSelect(`${this.alias}.user`, "user_lists")
        .where(`${this.alias}.uuid = :uuid`, { uuid })
        .getOne()
  }

  async save(entity: ListEntity): Promise<void> {
    await this.repository.save(entity)
  }

  async deleteOneByUuid(uuid: string): Promise<void> {
    await this.repository
      .createQueryBuilder(this.alias)
      .delete()
      .from(ListEntity)
      .where(`${this.alias}.uuid = :uuid`, { uuid })
      .execute()
  }
}