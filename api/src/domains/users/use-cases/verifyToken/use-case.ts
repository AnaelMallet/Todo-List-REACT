import jwt from "jsonwebtoken"

import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"
import { DomainError } from "@shared/domainError"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"
import { UserNotExistError, UserTokenOutdatedError } from "../../errors"

export class UserVerifyTokenUseCase implements BasicUseCase {
  repository: UserDomainRepository

  constructor(repository: UserDomainRepository) {
    this.repository = repository
  }

  async execute(userId: string): Promise<Result<string | null>> {
    const foundUserResult = await this.repository.findOneByUuid(userId)

    if (foundUserResult.isFailure === true) {
      return Result.fail(new UserNotExistError())
    }

    const user = foundUserResult.getValue()

    try {
      jwt.verify(user.props.refreshToken, process.env.JWT_KEY)
    } catch (error) {
      return Result.fail(new UserTokenOutdatedError())
    }

    let newAccessToken = null

    jwt.verify(user.props.accessToken, process.env.JWT_KEY, async (err) => {
      if (err) {
        if (err.message !== "jwt expired") {
          return Result.fail(new DomainError(err.name, err.message))
        }
        
        newAccessToken = jwt.sign({
          userId: user.uuid,
          refreshToken: user.props.refreshToken
        }, process.env.JWT_KEY, { expiresIn: "60s" })

        return Result.ok()
      }

      return Result.ok()
    })

    if (newAccessToken) {
      user.updateAccessToken(newAccessToken)

      this.repository.save(user)
      
      return Result.ok(newAccessToken)

    } else {
      return Result.ok()
    }
  }
}