import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"
import { UserNotExistError } from "../../errors"
import { Password } from "../../value-objects/password"

import { updateUserDto } from "./dto"

export class UpdateUserUseCase implements BasicUseCase {
  repository: UserDomainRepository

  constructor(repository: UserDomainRepository) {
    this.repository = repository
  }

  async execute(props: updateUserDto): Promise<Result<void>> {
    const userResult = await this.repository.findOneByUuid(props.uuid)

    if (userResult.isFailure === true) {
      return Result.fail(new UserNotExistError())
    }

    const user = userResult.getValue()

    if (props.firstname && props.firstname !== user.props.firstname) {
      user.updateFirstname(props.firstname)
    }

    if (props.lastname && props.lastname !== user.props.lastname) {
      user.updateLastname(props.lastname)
    }

    if (props.username !== user.props.username) {
      user.updateUsername(props.username)
    }

    if (props.email && props.email !== user.props.email.value) {
      const result = user.updateEmail(props.email)

      if (result.isFailure === true) {
        return Result.fail(result.getErrors())
      }
    }

    if (props.password && Password.comparePassword(props.password, user.props.password.value) === false) {
      const result  = user.updatePassword(props.password)

      if (result.isFailure === true) {
        return Result.fail(result.getErrors())
      }
    }

    await this.repository.save(user)

    return Result.ok()
  }
}