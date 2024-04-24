import { basicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"
import { User } from "../../entities/user"
import { Email } from "../../value-objects/email"
import { PasswordNotEqualsError } from "../../errors"
import { Password } from "../../value-objects/password"

import { userPropsDto } from "./dto"

export class CreateUserUseCase implements basicUseCase {
  repository: UserDomainRepository

  constructor(repository: UserDomainRepository) {
    this.repository = repository
  }

  async execute(args: userPropsDto): Promise<Result<void>> {
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      confirmationPassword
    } = args

    const emailResult = Email.create(email)

    if (emailResult.isFailure === true) {
      return Result.fail(emailResult.getErrors())
    }

    if (password !== confirmationPassword) {
      return Result.fail(new PasswordNotEqualsError())
    }

    const passwordResult = Password.create(password)

    if (passwordResult.isFailure === true) {
      return Result.fail(passwordResult.getErrors())
    }    

    const userResult = User.create({
      firstname,
      lastname,
      email: emailResult.getValue(),
      username,
      password: passwordResult.getValue()
    })

    if (userResult.isFailure === true) {
      return Result.fail(userResult.getErrors())
    }

    const user = userResult.getValue()

    await this.repository.save(user)
  
    return Result.ok()
  }
}