import bcrypt from "bcrypt"

import { Value } from "@shared/basicObjectClass"
import { Guard } from "@shared/guard"
import { Result } from "@shared/Results"

import { PasswordNotValidError } from "../errors"

export class Password extends Value<Password, string> {
  static create(value: string): Result<Password> {
    const guardResult = Result.test(
      Guard.againstNullOrUndefined(value, "value")
    )

    if (guardResult.isSuccess === false) {
      return Result.fail(guardResult.getErrors())
    }

    if (this.isValidPassword(value) === false) {
      return Result.fail(new PasswordNotValidError())
    }

    const hashedpassword = this.isHashed(value) === false
      ? this.hashPassword(value)
      : value 

    const password = new Password(hashedpassword)

    return Result.ok(password)
  }

  static isValidPassword(value: string): boolean {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g

    return regex.test(value)
  }

  static hashPassword(password: string): string {
    const hashedPassword = bcrypt.hashSync(password, 10)

    return hashedPassword
  }

  static comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword)
  }

  static isHashed(value: string): boolean {
    return (
      value.startsWith("$2a$10$")
      || value.startsWith("$2b$10$")
    ) && value.length === 60
  }
}