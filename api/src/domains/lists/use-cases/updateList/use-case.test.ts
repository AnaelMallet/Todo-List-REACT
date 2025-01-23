import { v4 as uuid } from "uuid"

import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"

import { listTestRepository } from "../../infra/databases/repositories"
import { ListNotExistError } from "../../errors"

import { CreateListUseCase } from "../createList/use-case"
import { listPropsDto } from "../createList/dto"

import { UpdateListUseCase } from "./use-case"
import { updateListDto } from "./dto"

describe("test the updateList use-case", () => {
  const userUuid = uuid()
  const listUuid = uuid()

  const createListUseCase = new CreateListUseCase(listTestRepository)
  const listProps: listPropsDto = {
    uuid: listUuid,
    name: "Task for today",
    isFavorite: false,
    userId: userUuid
  }

  const updateListUseCase = new UpdateListUseCase(listTestRepository)
  const updateListProps: updateListDto = {
    uuid: listUuid,
    name: "Tâches pour aujourd'hui"
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
    await createListUseCase.execute(listProps)
  })

  test("should update the list name", async () => {
    const updateListNameResult = await updateListUseCase.execute(updateListProps)

    expect(updateListNameResult.isSuccess).toBe(true)

    const listResult = await listTestRepository.findOneByUuid(updateListProps.uuid)
    const list = listResult.getValue()

    expect(list.name).toBe(updateListProps.name)
  })

    test("Should not update the list name because the list don't exist", async () => {
      const updateListNameProps = { ...updateListProps }
  
      updateListNameProps.uuid = uuid()
  
      const updateListNameResult = await updateListUseCase.execute(updateListNameProps)
      
      expect(updateListNameResult.isSuccess).toBe(false)
  
      const updateListNameErrors = updateListNameResult.getErrors()
  
      expect(updateListNameErrors.length).toBe(1)
      expect(updateListNameErrors[0]).toBeInstanceOf(ListNotExistError)
    })
})