import { DomainError } from "@shared/domainError"

export class FavoriteListNumberReachError extends DomainError {
  constructor() {
    super("favoriteList", "Number of favorite list reached (5 maximum)")
  }
} 