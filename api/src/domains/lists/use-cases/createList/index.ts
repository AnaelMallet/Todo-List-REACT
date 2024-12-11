import { listDomainRepository } from "../../repositories/implementations"

import { CreateListuseCase } from "./use-case"
import { CreateListController } from "./controller"

const createListUseCase = new CreateListuseCase(listDomainRepository)
const createListController = new CreateListController(createListUseCase)

export {
createListUseCase,
createListController
}