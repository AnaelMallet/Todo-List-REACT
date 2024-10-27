import { PasswordNotValidError } from "../errors"

import { Password } from "./password"

describe("test the password value-object", () => {
  let passwordValue = "JohnDoe@99"

  test("should create an password", () => {
    const passwordResult = Password.create(passwordValue)
  
    expect(passwordResult.isSuccess).toBe(true)
  
    const password = passwordResult.getValue()
  
    expect(Password.comparePassword(passwordValue, password.value)).toBe(true)
  })
  
  test("should not create an password because email is undefined", () => {
    const passwordResult = Password.create(undefined)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0].message).toBe("againstNullOrUndefined")
  })
  
  test("should not create an password because email is invalid", () => {
    passwordValue = "johndoe99"
    
    const passwordResult = Password.create(passwordValue)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0]).toBeInstanceOf(PasswordNotValidError)
  })
})