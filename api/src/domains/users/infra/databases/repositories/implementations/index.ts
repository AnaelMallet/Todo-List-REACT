import UserEntity from "../../entities/user"

import { UserRepository } from "./user"

const userRepository = new UserRepository(UserEntity)

export {
  userRepository
}