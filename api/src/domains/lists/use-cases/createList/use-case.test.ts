import { v4 as uuid } from "uuid"

import { listTestRepository } from "../../infra/databases/repositories"

import { CreateListuseCase } from "./use-case"
import { listPropsDto } from "./dto"
import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"

describe("test the createList use-case", () => {
  const createListUseCase = new CreateListuseCase(listTestRepository)

  const userUuid = uuid()
  const listProps: listPropsDto = {
    name: "task for today",
    isFavorite: false,
    userId: userUuid
  }

  beforeAll(async () => {
    const userProps: userPropsDto = {
      uuid: userUuid,
      firstname: "john",
      lastname: "smith",
      email: "gfhib@ujfd.fr",
      username: "john Smith",
      password: "rhngwAELN2C@B58j",
      confirmationPassword: "rhngwAELN2C@B58j"
    }

    const createUserUseCase = new CreateUserUseCase(userTestRepository)

    await createUserUseCase.execute(userProps)
  })

  test("Should create a list", async () => {
    const cretaeListResult = await createListUseCase.execute(listProps)

    expect(cretaeListResult.isSuccess).toBe(true)
  })
})