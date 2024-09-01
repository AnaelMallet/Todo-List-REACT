import { Entity } from "@shared/basicObjectClass"
import { Result } from "@shared/Results"
import { Guard } from "@shared/guard"

import { Email } from "../value-objects/email"
import { Password } from "../value-objects/password"

export type UserProps = {
  firstname: string
  lastname: string
  username?: string
  email: Email
  password: Password
  accessToken?: string
  refreshToken?: string
}

export class User extends Entity<User, UserProps> {
  get firstname(): string {
    return this.props.firstname
  }

  get lastname(): string {
    return this.props.lastname
  }

  get username(): string {
    return this.props.username
  }

  get email(): Email {
    return this.props.email
  }
  
  get password(): Password {
    return this.props.password
  }

  get accessToken(): string {
    return this.accessToken
  }

  get refreshToken(): string {
    return this.refreshToken
  }
  
  static create(props: UserProps, uuid?: string): Result<User> {
    const guardResults = Result.combine([
      Guard.againstNullOrUndefined(props.firstname, "firstname"),
      Guard.againstNullOrUndefined(props.lastname, "lastname"),
      Guard.againstNullOrUndefined(props.email, "email"),
      Guard.againstNullOrUndefined(props.password, "password")
    ])

    if (guardResults.isSuccess === false) {
      return Result.fail(guardResults.getErrors())
    }

    const user = new User({ ...props }, uuid)

    return Result.ok(user)
  }

  updateFirstname(firstname: string): void {
    this.props.firstname = firstname
  }

  updateLastname(lastname: string): void {
    this.props.lastname = lastname
  }

  updateEmail(email: string): Result<void> {
    const emailResult = Email.create(email)

    if (emailResult.isFailure === true) {
      return Result.fail(emailResult.getErrors())
    }

    this.props.email = emailResult.getValue()

    return Result.ok()
  }

  updateUsername(username: string): void {
    this.props.username = username
  }

  updatePassword(password: string): Result<void> {
    const passwordResult = Password.create(password)

    if (passwordResult.isFailure === true) {
      return Result.fail(passwordResult.getErrors())
    }

    this.props.password = passwordResult.getValue()

    return Result.ok()
  }

  updateAccessToken(accessToken: string): void {
    this.props.accessToken = accessToken
  }

  updateRefreshToken(refreshToken: string): void {
    this.props.refreshToken = refreshToken
  }
}

