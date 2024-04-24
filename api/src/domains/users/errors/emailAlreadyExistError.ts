import { DomainError } from "@shared/domainError"

export class EmailAlreadyExistError extends DomainError {
  constructor() {
    super("user email", "this email has already been used by another user")
  }
}