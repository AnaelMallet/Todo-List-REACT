import { userDomainRepository } from "../../repositories/implementations"

import { LoginUserController } from "./controller"
import { LoginUserUseCase } from "./use-case"

const loginUserUseCase = new LoginUserUseCase(userDomainRepository)
const loginUserController = new LoginUserController(loginUserUseCase)

export {
  loginUserUseCase,
  loginUserController
}