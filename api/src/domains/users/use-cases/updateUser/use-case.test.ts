import { v4 as uuid } from "uuid"

import { UserNotExistError } from "../../errors"
import { userTestRepository } from "../../infra/databases/repositories"

import { userPropsDto } from "../createUser/dto"
import { CreateUserUseCase } from "../createUser/use-case"

import { updateUserDto } from "./dto"
import { UpdateUserUseCase } from "./use-case"

describe("test the updateUser use-case", () => {
  const updateUserUseCase = new UpdateUserUseCase(userTestRepository)

  const userUuid = uuid()
  const userProps: updateUserDto = {
    uuid: userUuid
  }

  beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase(userTestRepository)
    const createUserProps: userPropsDto = {
      uuid: userUuid,
      firstname: "john",
      lastname: "smith",
      email: "gfhib@ujfd.fr",
      username: "john Smith",
      password: "rhngwAELN2C@B58j",
      confirmationPassword: "rhngwAELN2C@B58j"
    }
    
    await createUserUseCase.execute(createUserProps)
  })

  test("should update the firstname of the user", async () => {
    const updateUserProps = {...userProps}

    updateUserProps.firstname = "jane"

    const updateUserResult = await updateUserUseCase.execute(updateUserProps)

    expect(updateUserResult.isSuccess).toBe(true)

    const userResult = await userTestRepository.findOneByUuid(updateUserProps.uuid)
    const user = userResult.getValue()

    expect(user.firstname).toBe(updateUserProps.firstname)
  })

  test("should update the lastname of the user", async () => {
    const updateUserProps = {...userProps}

    updateUserProps.lastname = "deane"

    const updateUserResult = await updateUserUseCase.execute(updateUserProps)

    expect(updateUserResult.isSuccess).toBe(true)

    const userResult = await userTestRepository.findOneByUuid(updateUserProps.uuid)
    const user = userResult.getValue()

    expect(user.lastname).toBe(updateUserProps.lastname)
  })

  test("should update the username of the user", async () => {
    const updateUserProps = {...userProps}

    updateUserProps.username = "jdeane"

    const updateUserResult = await updateUserUseCase.execute(updateUserProps)

    expect(updateUserResult.isSuccess).toBe(true)

    const userResult = await userTestRepository.findOneByUuid(updateUserProps.uuid)
    const user = userResult.getValue()

    expect(user.username).toBe(updateUserProps.username)
  })

  test("should update the email of the user", async () => {
    const updateUserProps = {...userProps}

    updateUserProps.email = "jane.deane@test.js"

    const updateUserResult = await updateUserUseCase.execute(updateUserProps)

    expect(updateUserResult.isSuccess).toBe(true)

    const userResult = await userTestRepository.findOneByUuid(updateUserProps.uuid)
    const user = userResult.getValue()

    expect(user.email.value).toBe(updateUserProps.email)
  })

  test("should update the password of the user", async () => {
    const updateUserProps = {...userProps}

    updateUserProps.password = "psogiddE5GSLD@D65GH"

    const updateUserResult = await updateUserUseCase.execute(updateUserProps)

    expect(updateUserResult.isSuccess).toBe(true)
  })

  test("should not update the user because the user not exist", async () => {
    const updateUserProps = {...userProps}
    
    updateUserProps.uuid = uuid()
    
    const updateUserResult = await updateUserUseCase.execute(updateUserProps)

    expect(updateUserResult.isSuccess).toBe(false)

    const updateUserErrors = updateUserResult.getErrors()

    expect(updateUserErrors.length).toBe(1)
    expect(updateUserErrors[0]).toBeInstanceOf(UserNotExistError)
  })
})