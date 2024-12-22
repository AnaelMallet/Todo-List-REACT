import { Result } from "@shared/Results"
import { BasicTransformer } from "@shared/basicTransformer"

import UserEntity from "../infra/databases/entities/user"
import { User, UserProps } from "../entities/user"
import { Email } from "../value-objects/email"
import { Password } from "../value-objects/password"

export class UserTransformer extends BasicTransformer<User, UserEntity> {
  arrayToDomain(databaseEntities: UserEntity[]): Result<User[]> {
    throw new Error("Method not implemented.")
  }

  toDomain(databaseEntity: UserEntity): Result<User> {
    const emailResult = Email.create(databaseEntity.email)
    const passwordResult = Password.create(databaseEntity.password)

    const props: UserProps = {
      firstname: databaseEntity.firstrname,
      lastname: databaseEntity.lastname,
      username: databaseEntity.username,
      email: emailResult.getValue(),
      password: passwordResult.getValue(),
      accessToken: databaseEntity.accessToken,
      refreshToken: databaseEntity.refreshToken
    }

    const domainUser = User.create(props, databaseEntity.uuid)

    return domainUser
  }

  toDatabase(domainEntity: User): UserEntity {
      const entityUser = new UserEntity()

      entityUser.uuid = domainEntity.uuid
      entityUser.firstrname = domainEntity.props.firstname
      entityUser.lastname = domainEntity.props.lastname
      entityUser.username = domainEntity.props.username
      entityUser.email = domainEntity.props.email.value
      entityUser.password = domainEntity.props.password.value
      entityUser.accessToken = domainEntity.props.accessToken
      entityUser.refreshToken = domainEntity.props.refreshToken

      return entityUser
  }
}