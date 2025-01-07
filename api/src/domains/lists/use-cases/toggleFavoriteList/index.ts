import { listDomainRepository } from "../../repositories/implementations"

import { ToggleFavoriteListController } from "./controller"
import { ToggleFavoriteListUseCase } from "./use-case"

const toggleFavoriteListUseCase = new ToggleFavoriteListUseCase(listDomainRepository)
const toggleFavoriteListController = new ToggleFavoriteListController(toggleFavoriteListUseCase)

export {
  toggleFavoriteListUseCase,
  toggleFavoriteListController
}