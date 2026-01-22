import BasicRepository from "@shared/basicRepository"

import UserEntity from "../../entities/user"

import { IUserRepository } from "../I_user"

export class UserRepository extends BasicRepository<UserEntity> implements IUserRepository {
  alias = "users"

  async findOneByUuid(uuid: string): Promise<UserEntity> {
    return await this.repository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.uuid = :uuid`, { uuid })
      .getOne()
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
      return await this.repository
        .createQueryBuilder(this.alias)
        .where(`${this.alias}.email = :email`, { email })
        .getOne()
  }

  async save(entity: UserEntity): Promise<void> {
      await this.repository.save(entity)
  }
}