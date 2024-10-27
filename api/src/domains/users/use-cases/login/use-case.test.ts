import { userTestRepository } from "../../infra/databases/repositories"

import { CreateUserUseCase } from "../createUser/use-case"
import { userPropsDto } from "../createUser/dto"
import { LoginNotValidError } from "../../errors"

import { loginUserPropsDto } from "./dto"
import { LoginUserUseCase } from "./use-case"

describe("test the login use-case", () => {
  const loginUserUseCase = new LoginUserUseCase(userTestRepository)

  const loginProps: loginUserPropsDto = {
    login: "gfhib@ujfd.fr",
    password: "rhngwAELN2C@B58j"
  }

  beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase(userTestRepository)

    const userProps: userPropsDto = {
      firstname: "john",
      lastname: "smith",
      email: "gfhib@ujfd.fr",
      username: "john Smith",
      password: "rhngwAELN2C@B58j",
      confirmationPassword: "rhngwAELN2C@B58j"
    }

    await createUserUseCase.execute(userProps)
  })

  test("user should be logged in", async () => {
    const loginUserResult = await loginUserUseCase.execute(loginProps)
  
    expect(loginUserResult.isSuccess).toBe(true)
    
    const loginValues = loginUserResult.getValue()
  
    expect(loginValues.accessToken).toBeDefined()
  })

  test("user should not be logged in because user is not found (email is invalid)", async () => {
    const props = {...loginProps}

    props.login = "fggfsg@sf.fr"

    const loginUserResult = await loginUserUseCase.execute(props)
  
    expect(loginUserResult.isSuccess).toBe(false)

    const loginUserErrors = loginUserResult.getErrors()
    
    expect(loginUserErrors.length).toBe(1)
    expect(loginUserErrors[0]).toBeInstanceOf(LoginNotValidError)
  })

  test("user should not be logged in because user is not found (password is invalid)", async () => {
    const props = {...loginProps}

    props.password = "ragbU7@Ck2HAx8VD"

    const loginUserResult = await loginUserUseCase.execute(props)
  
    expect(loginUserResult.isSuccess).toBe(false)

    const loginUserErrors = loginUserResult.getErrors()
    
    expect(loginUserErrors.length).toBe(1)
    expect(loginUserErrors[0]).toBeInstanceOf(LoginNotValidError)
  })
})