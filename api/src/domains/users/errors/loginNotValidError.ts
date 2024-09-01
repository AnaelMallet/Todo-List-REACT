import { DomainError } from "@shared/domainError"

export class LoginNotValidError extends DomainError {
  constructor() {
    super("login", "login/passsword invalid")
  }
}