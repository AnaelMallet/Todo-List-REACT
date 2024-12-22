import { listDomainRepository } from "../../repositories/implementations"

import { ListsController } from "./controller"
import { ListsUseCase } from "./use-case"

const listsUseCase = new ListsUseCase(listDomainRepository)
const listsController = new ListsController(listsUseCase)

export {
  listsUseCase,
  listsController
}