import { Entity } from "@shared/basicObjectClass"
import { Result } from "@shared/Results"
import { Guard } from "@shared/guard"

import { Email } from "../value-objects/email"

export type UserProps = {
  firstname: string
  lastname: string
  username?: string
  email: Email
  password: string
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
  
  get password(): string {
    return this.props.password
  }
  
  static create(props: UserProps): Result<User> {
    const guardResults = Result.combine([
      Guard.againstNullOrUndefined(props.firstname, "firstname"),
      Guard.againstNullOrUndefined(props.lastname, "lastname"),
      Guard.againstNullOrUndefined(props.email, "email"),
      Guard.againstNullOrUndefined(props.password, "password")
    ])

    if (guardResults.isSuccess === false) {
      return Result.fail(guardResults.getErrors())
    }

    const user = new User({ ...props })

    return Result.ok(user)
  }
}

