import { userDomainRepository } from "../../repositories/implementations"

import { UserVerifyTokenController } from "./controller"
import { UserVerifyTokenUseCase } from "./use-case"

const userVerifyTokenUseCase = new UserVerifyTokenUseCase(userDomainRepository)
const userVerifyTokenController = new UserVerifyTokenController(userVerifyTokenUseCase)

export {
  userVerifyTokenUseCase,
  userVerifyTokenController
}