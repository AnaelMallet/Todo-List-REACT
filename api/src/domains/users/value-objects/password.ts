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

    const hashedPassword = this.hashPassword(value)

    const password = new Password(hashedPassword)

    return Result.ok(password)
  }

  static isValidPassword(value: string): boolean {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g

    return regex.test(value)
  }

  static hashPassword(password: string): string {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    return hashedPassword
  }

  static comparePassword(password: string, hashedPassword: string): boolean {
    console.log("password, hashedPassword", password, hashedPassword)
    
    return bcrypt.compareSync(password, hashedPassword)
  }
}