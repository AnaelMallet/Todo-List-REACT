import { v4 as uuid } from "uuid"

import { userTestRepository } from "../../infra/databases/repositories"
import { UserNotExistError } from "../../errors"

import { userPropsDto } from "../createUser/dto"
import { CreateUserUseCase } from "../createUser/use-case"

import { UserMeUseCase } from "./use-case"

describe("test the me use-case" , () => {
  const meUseCase = new UserMeUseCase(userTestRepository)

  const userUuid = uuid()
  const userProps: userPropsDto = {
    uuid: userUuid,
    firstname: "john",
    lastname: "smith",
    email: "gfhib@ujfd.fr",
    username: "john Smith",
    password: "rhngwAELN2C@B58j",
    confirmationPassword: "rhngwAELN2C@B58j"
  }


  beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase(userTestRepository)

    await createUserUseCase.execute(userProps)
  })

  test("should return the user", async () => {
    const meResult = await meUseCase.execute(userUuid)

    expect(meResult.isSuccess).toBe(true)

    const meErrors = meResult.getErrors()

    expect(meErrors.length).toBe(0)

    const me = meResult.getValue()

    expect(me.email).toBe(userProps.email)
    expect(me.firstname).toBe(userProps.firstname)
    expect(me.lastname).toBe(userProps.lastname)
    expect(me.username).toBe(userProps.username)
  })

  test("should return null because the user is not connected", async () => {
    const meResult = await meUseCase.execute(null)

    expect(meResult.isSuccess).toBe(true)

    const meErrors = meResult.getErrors()

    expect(meErrors.length).toBe(0)

    const me = meResult.getValue()

    expect(me).toBe(null)
  })

  test("should not return the user because the user not exist", async () => {
    const meResult = await meUseCase.execute(uuid())

    expect(meResult.isSuccess).toBe(false)

    const meErrors = meResult.getErrors()

    expect(meErrors.length).toBe(1)
    expect(meErrors[0]).toBeInstanceOf(UserNotExistError)
  })
})