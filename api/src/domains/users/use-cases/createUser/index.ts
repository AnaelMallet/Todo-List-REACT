import { userDomainRepository } from "../../repositories/implementations"

import { CreateUserController } from "./controller"
import { CreateUserUseCase } from "./use-case"

const createUserUseCase = new CreateUserUseCase(userDomainRepository)
const createUserController = new CreateUserController(createUserUseCase)

export {
  createUserUseCase,
  createUserController
}