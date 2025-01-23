import { DomainError } from "@shared/domainError"

export class UserTokenOutdatedError extends DomainError {
  constructor() {
    super("token", "connexion expiré")
  }
}