import { userRepository } from "../../infra/databases/repositories/implementations"

import { UserDomainRepository } from "./userDomainRepository"

const userDomainRepository = new UserDomainRepository(userRepository)

export {
  userDomainRepository
}