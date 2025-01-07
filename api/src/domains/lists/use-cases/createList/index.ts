import { listDomainRepository } from "../../repositories/implementations"

import { CreateListUseCase } from "./use-case"
import { CreateListController } from "./controller"

const createListUseCase = new CreateListUseCase(listDomainRepository)
const createListController = new CreateListController(createListUseCase)

export {
createListUseCase,
createListController
}