import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { IUserDomainRepository } from "../../repositories/I-UserDomainRepository"
import { UserNotExistError } from "../../errors"

export type UserInfo = {
  firstname: string
  lastname: string
  email: string
  username?: string
}

export class UserMeUseCase implements BasicUseCase {
  repository: IUserDomainRepository

  constructor(repository: IUserDomainRepository) {
    this.repository = repository
  }

  async execute(userId: string): Promise<Result<UserInfo | null>> {
    if (!userId) {
      return Result.ok(null)
    }

    const foundUserResult = await this.repository.findOneByUuid(userId)

    if (foundUserResult.isFailure === true) {
      return Result.fail(new UserNotExistError())
    }

    const user = foundUserResult.getValue()

    const userInfo: UserInfo = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email.value,
      username: user.username
    }

    return Result.ok(userInfo)
  }
}