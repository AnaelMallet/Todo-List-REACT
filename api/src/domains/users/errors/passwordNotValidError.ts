import { DomainError } from "@shared/domainError"

export class PasswordNotValidError extends DomainError {
  constructor() {
    super(
      "user password",
      "the value is not valid"
    )
  }
}