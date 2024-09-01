import { userDomainRepository } from "../../repositories/implementations"

import { UserMeController } from "./controller"
import { UserMeUseCase } from "./use-case"

const userMeUseCase = new UserMeUseCase(userDomainRepository)
const userMeController = new UserMeController(userMeUseCase)

export {
  userMeUseCase,
  userMeController
}