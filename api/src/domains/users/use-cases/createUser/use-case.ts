import bcrypt from "bcrypt"

import { basicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"
import { User } from "../../entities/user"
import { Email } from "../../value-objects/email"

import { userPropsDto } from "./dto"
import { PasswordNotEqualsError } from "../../errors"

export class CreateUserUseCase implements basicUseCase {
  userRepository: UserDomainRepository

  constructor(userRepository: UserDomainRepository) {
    this.userRepository = userRepository
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

    const hashedPassword = await this.hashPassword(password)

    const userResult = User.create({
      firstname,
      lastname,
      email: emailResult.getValue(),
      username,
      password: hashedPassword
    })

    if (userResult.isFailure === true) {
      return Result.fail(userResult.getErrors())
    }

    const user = userResult.getValue()

    await this.userRepository.save(user)
  
    return Result.ok()
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.hash(password, 12)

    return salt
  }
}