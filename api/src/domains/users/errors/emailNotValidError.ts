import { DomainError } from "@shared/domainError"

export class EmailNotValidError extends DomainError {
  constructor() {
    super("user email", "the value is not valid")
  }
}