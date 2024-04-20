import { Guard } from "@shared/guard"
import { Result } from "@shared/Results"
import { Value } from "@shared/basicObjectClass"

import { EmailNotValidError } from "../errors"

export class Email extends Value<Email, string> {
  static create(value: string): Result<Email> {
    const guardResult = Result.test(
      Guard.againstNullOrUndefined(value, "value")
    )

    if (guardResult.isSuccess === false) {
      return Result.fail(guardResult.getErrors())
    }

    if (this.isValidEmail(value) === false) {
      return Result.fail(new EmailNotValidError())
    }

    const email = new Email(value)

    return Result.ok(email)
  }

  static isValidEmail(value: string): boolean {
    const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/g

    return regex.test(value)
  }
}