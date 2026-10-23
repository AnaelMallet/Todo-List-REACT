import { DomainError } from "@shared/domainError"

export class FavoriteListNumberReachError extends DomainError {
  constructor() {
    super("favoriteList", "Nombre de listes en favoris atteint (5 maximum).")
  }
} 