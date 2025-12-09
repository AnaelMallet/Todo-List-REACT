import { listDomainRepository, taskDomainRepository } from "../../../repositories/implementations"

import { DeleteListController } from "./controller"
import { DeleteListUseCase } from "./use-case"

const deleteListUseCase = new DeleteListUseCase(listDomainRepository, taskDomainRepository)
const deleteListController = new DeleteListController(deleteListUseCase)

export {
  deleteListUseCase,
  deleteListController
}