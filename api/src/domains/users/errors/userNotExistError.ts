import { DomainError } from "@shared/domainError"

export class UserNotExistError extends DomainError {
  constructor() {
    super(
      "user",
      "this user don't exist"
    )
  }
}