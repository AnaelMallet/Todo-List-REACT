import { userTestRepository } from "../../infra/databases/repositories"
import { EmailAlreadyExistError, PasswordNotEqualsError } from "../../errors"

import { CreateUserUseCase } from "./use-case"
import { userPropsDto } from "./dto"

describe("test the createUser use-case", () => {
  const createUserUseCase = new CreateUserUseCase(userTestRepository)

  const userProps: userPropsDto = {
    firstname: "john",
    lastname: "smith",
    email: "gfhib@ujfd.fr",
    username: "john Smith",
    password: "rhngwAELN2C@B58j",
    confirmationPassword: "rhngwAELN2C@B58j"
  }

  test("should create an user", async () => {
    const createUserResult = await createUserUseCase.execute(userProps)
  
    expect(createUserResult.isSuccess).toBe(true)
  })
  
  test("should create an user even if username is undefined", async () => {
    const props = {...userProps}
  
    props.username = undefined
    props.email = "oijght@se.fr"
  
    const createUserResult = await createUserUseCase.execute(props)
  
    expect(createUserResult.isSuccess).toBe(true)
  })
  
  test("shouldn't create an user because an user already use this email", async () => {
    const createUserResult = await createUserUseCase.execute(userProps)
  
    expect(createUserResult.isSuccess).toBe(false)
  
    const createUserErrors = createUserResult.getErrors()
  
    expect(createUserErrors.length).toBe(1)
    expect(createUserErrors[0]).toBeInstanceOf(EmailAlreadyExistError)
  })
  
  test("shouldn't create an user because password and confirmation password are different", async () => {
    const props = {...userProps}
  
    props.email = "ozjdd@osfjd.fr"
    props.confirmationPassword = "ragbU7@Ck2HAx8VD"
  
    const createUserResult = await createUserUseCase.execute(props)
  
    expect(createUserResult.isSuccess).toBe(false)
  
    const createUserErrors = createUserResult.getErrors()
  
    expect(createUserErrors.length).toBe(1)
    expect(createUserErrors[0]).toBeInstanceOf(PasswordNotEqualsError)
  })
})