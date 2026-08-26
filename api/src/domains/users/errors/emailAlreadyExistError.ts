import { DomainError } from "@shared/domainError"

export class EmailAlreadyExistError extends DomainError {
  constructor() {
    super("user email", "cet adresse email est déjà utilisé.")
  }
}