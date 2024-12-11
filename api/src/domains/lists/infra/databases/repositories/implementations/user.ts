import BasicRepository from "@shared/basicRepository"

import List from "../../entities/list"

import { IListRepository } from "../I_list"

export class ListRepository extends BasicRepository<List> implements IListRepository {
  alias = "lists"
  
  async findAll(): Promise<List[]> {
    return await this.repository
      .createQueryBuilder(this.alias)
      .addOrderBy(`${this.alias}.name`, "ASC")
      .addOrderBy(`${this.alias}.is_favorite`, "ASC")
      .getMany()
  }

  async findOneByUuid(uuid: string): Promise<List> {
      return await this.repository
        .createQueryBuilder(this.alias)
        .where(`${this.alias}.uuid = :uuid`, { uuid })
        .getOne()
  }

  async save(entity: List): Promise<void> {
    await this.repository.save(entity)
  }
}