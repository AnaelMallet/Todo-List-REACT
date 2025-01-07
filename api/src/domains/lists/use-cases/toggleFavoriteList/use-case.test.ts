import { v4 as uuid } from "uuid"

import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"

import { listTestRepository } from "../../infra/databases/repositories"

import { CreateListUseCase } from "../createList/use-case"
import { listPropsDto } from "../createList/dto"
import { ToggleFavoriteListUseCase } from "./use-case"
import { toggleFavoriteDto } from "./dto"
import { FavoriteListNumberReachError, ListNotExistError } from "../../errors"

describe("test the toggleFavoriteList use-case", () => {
    const userUuid = uuid()
    const listUuid = uuid()

    const createListUseCase = new CreateListUseCase(listTestRepository)
    const listProps: listPropsDto = {
      uuid: listUuid,
      name: "task for today",
      isFavorite: false,
      userId: userUuid
    }
    
    const toggleFavoriteListUseCase = new ToggleFavoriteListUseCase(listTestRepository)
    const toggleFavoriteProps: toggleFavoriteDto = {
      userId: userUuid,
      listUuid
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

  test("Should update the list to be favorite", async () => {
    const toggleFavoriteListResult = await toggleFavoriteListUseCase.execute(toggleFavoriteProps)

    expect(toggleFavoriteListResult.isSuccess).toBe(true)
    
    const listResult = await listTestRepository.findOneByUuid(toggleFavoriteProps.listUuid)
    const list = listResult.getValue()

    expect(list.isFavorite).toBe(true)
  })

  test("Should update the same list to be unfavorite", async () => {
    const toggleFavoriteListResult = await toggleFavoriteListUseCase.execute(toggleFavoriteProps)

    expect(toggleFavoriteListResult.isSuccess).toBe(true)
    
    const listResult = await listTestRepository.findOneByUuid(toggleFavoriteProps.listUuid)
    const list = listResult.getValue()

    expect(list.isFavorite).toBe(false)
  })

  test("Should not update the list because the list don't exist", async () => {
    const favoriteProps = { ...toggleFavoriteProps }

    favoriteProps.listUuid = uuid()

    const toggleFavoriteListResult = await toggleFavoriteListUseCase.execute(favoriteProps)
    
    expect(toggleFavoriteListResult.isSuccess).toBe(false)

    const toggleFavoriteListErrors = toggleFavoriteListResult.getErrors()

    expect(toggleFavoriteListErrors.length).toBe(1)
    expect(toggleFavoriteListErrors[0]).toBeInstanceOf(ListNotExistError)
  })

  test("Should not update the list because the maximum number of favorite list has been reached", async () => {
    const newListUuids = [
      uuid(),
      uuid(),
      uuid(),
      uuid()
    ]

    for (const newListUuid of newListUuids) {
      const createListProps = { ...listProps }

      createListProps.uuid = newListUuid

      await createListUseCase.execute(createListProps)

      const toggleListProps = { ...toggleFavoriteProps }

      toggleListProps.listUuid = newListUuid

      await toggleFavoriteListUseCase.execute(toggleListProps)
    }

    const lastListUuid = uuid()

    const createListProps = { ...listProps }

    createListProps.uuid = lastListUuid

    await createListUseCase.execute(createListProps)

    const toggleListProps = { ...toggleFavoriteProps }

    toggleListProps.listUuid = lastListUuid

    const toggleFavoriteListResult = await toggleFavoriteListUseCase.execute(toggleListProps)

    expect(toggleFavoriteListResult.isSuccess).toBe(false)

    const toggleFavoriteListErrors = toggleFavoriteListResult.getErrors()

    expect(toggleFavoriteListErrors.length).toBe(1)
    expect(toggleFavoriteListErrors[0]).toBeInstanceOf(FavoriteListNumberReachError)
  })
})