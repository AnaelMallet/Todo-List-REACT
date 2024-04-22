import { Result } from "@shared/Results"
import { BasicTransformer } from "@shared/basicTransformer"

import UserEntity from "../infra/databases/entities/user"
import { User, UserProps } from "../entities/user"
import { Email } from "../value-objects/email"

export class UserTransformer extends BasicTransformer<User, UserEntity> {
  async toDomain(databaseEntity: UserEntity): Promise<Result<User>> {
    const emailResult = Email.create(databaseEntity.email)

    const props: UserProps = {
      firstname: databaseEntity.firstrname,
      lastname: databaseEntity.lastname,
      username: databaseEntity.username,
      email: emailResult.value,
      password: databaseEntity.password
    }

    const domainUser = User.create(props)

    return domainUser
  }

  async toDatabase(domainEntity: User): Promise<UserEntity> {
      const entityUser = new UserEntity()

      entityUser.uuid = domainEntity.uuid
      entityUser.firstrname = domainEntity.props.firstname
      entityUser.lastname = domainEntity.props.lastname
      entityUser.username = domainEntity.props.username
      entityUser.email = domainEntity.props.email.value
      entityUser.password = domainEntity.props.password

      return entityUser
  }
}