import BasicRepository from "@shared/basicRepository"

import User from "../../entities/user"

import { IUserRepository } from "../I_user"

export class UserRepository extends BasicRepository<User> implements IUserRepository {
  async save(entity: User): Promise<void> {
      await this.repository.save(entity)
  }
}