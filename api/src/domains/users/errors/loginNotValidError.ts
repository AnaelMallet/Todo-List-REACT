import { DomainError } from "@shared/domainError"

export class LoginNotValidError extends DomainError {
  constructor() {
    super("login", "Adresse email ou mot de passe incorrect")
  }
}