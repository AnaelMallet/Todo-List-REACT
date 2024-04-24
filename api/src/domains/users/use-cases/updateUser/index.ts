import { userDomainRepository } from "../../repositories/implementations"

import { UpdateUserController } from "./controller"
import { UpdateUserUseCase } from "./use-case"

const updateUserUseCase = new UpdateUserUseCase(userDomainRepository)
const updateUserController = new UpdateUserController(updateUserUseCase)

export {
  updateUserUseCase,
  updateUserController
}