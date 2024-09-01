import jwt from "jsonwebtoken"

import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"
import { LoginNotValidError } from "../../errors"
import { Password } from "../../value-objects/password"

import { loginUserPropsDto } from "./dto"

type UserLoginData = {
  userId: string
  accessToken: string
}

export class LoginUserUseCase implements BasicUseCase {
  repository: UserDomainRepository

  constructor(repository: UserDomainRepository) {
    this.repository = repository
  }

  async execute(args: loginUserPropsDto): Promise<Result<UserLoginData>> {
    const {
      login,
      password
    } = args

    const foundUserResult = await this.repository.findOneByEmail(login)

    if (foundUserResult.isFailure === true) {
      Password.hashPassword(password) //avoid timing attack

      return Result.fail(new LoginNotValidError())
    }

    const user = foundUserResult.getValue()

    const isIdentical = Password.comparePassword(password, user.password.value)

    if (isIdentical === false) {
      return Result.fail(new LoginNotValidError())
    }

    const refreshToken = jwt.sign({ userId: user.uuid }, process.env.JWT_KEY, { expiresIn: "1d" })
    const accessToken = jwt.sign({
      userId: user.uuid,
      refreshToken
    }, process.env.JWT_KEY, { expiresIn: "60s" })

    user.updateRefreshToken(refreshToken)
    user.updateAccessToken(accessToken)

    await this.repository.save(user)

    const userLoginData = {
      userId: user.uuid,
      accessToken: accessToken
    }

    return Result.ok(userLoginData)
  }
}