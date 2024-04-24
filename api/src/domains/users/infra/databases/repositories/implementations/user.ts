import BasicRepository from "@shared/basicRepository"

import User from "../../entities/user"

import { IUserRepository } from "../I_user"

export class UserRepository extends BasicRepository<User> implements IUserRepository {
  alias = "users"

  async findOneByUuid(uuid: string): Promise<User> {
    const entity = await this.repository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.uuid = :uuid`, { uuid })
      .getOne()

    if (entity === undefined) {
      return undefined
    }

    return entity
  }

  async save(entity: User): Promise<void> {
      await this.repository.save(entity)
  }
}