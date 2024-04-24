import { Result } from "@shared/Results"

import { User } from "../entities/user"

export interface IUserDomainRepository {
  findOneByUuid(uuid: string): Promise<Result<User>>
  save(props: any): Promise<void>
}