import { DomainError } from "@shared/domainError"

export class PasswordNotEqualsError extends DomainError {
  constructor() {
    super(
      "user password and confimration password",
      "the password and the confirmation password are not equals"
    )
  }
}