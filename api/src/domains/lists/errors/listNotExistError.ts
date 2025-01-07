import { DomainError } from "@shared/domainError"

export class ListNotExistError extends DomainError {
  constructor() {
    super("list", "this list don't exist")
  }
} 