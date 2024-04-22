import { UserRepository } from "../../infra/databases/repositories/implementations/user"
import { userTransformer } from "../../transformers"

import { IUserDomainRepository } from "../I-UserDomainRepository"

export class UserDomainRepository implements IUserDomainRepository {
  repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async save(props: any): Promise<void> {
    const user = await userTransformer.toDatabase(props)

    await this.repository.save(user)
  }
}