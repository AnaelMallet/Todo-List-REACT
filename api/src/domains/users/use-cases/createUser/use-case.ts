import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"
import { User } from "../../entities/user"
import { Email } from "../../value-objects/email"
import { EmailAlreadyExistError, PasswordNotEqualsError } from "../../errors"
import { Password } from "../../value-objects/password"

import { userPropsDto } from "./dto"

export class CreateUserUseCase implements BasicUseCase {
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

    const emailValue = emailResult.getValue()

    const foundUserByEmailResult = await this.repository.findOneByEmail(emailValue.value)

    if (foundUserByEmailResult.isSuccess === true) {
      return Result.fail(new EmailAlreadyExistError())
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
      email: emailValue,
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