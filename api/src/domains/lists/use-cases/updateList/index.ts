import { listDomainRepository } from "../../repositories/implementations"

import { UpdateListController } from "./controller"
import { UpdateListUseCase } from "./use-case"

const updateListUseCase = new UpdateListUseCase(listDomainRepository)
const updateLIstController = new UpdateListController(updateListUseCase)

export {
  updateListUseCase,
  updateLIstController
}