import { describe, expect, test } from "@jest/globals"

import { AgainstNullOrUndefinedError } from "@shared/basicErrors"

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
  
  test("should not create an password because password is undefined", () => {
    const passwordResult = Password.create(undefined as unknown as string)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0]).toBeInstanceOf(AgainstNullOrUndefinedError)
  })
  
  test("should not create an password because password is invalid (length issue)", () => {
    passwordValue = "John@99"
    
    const passwordResult = Password.create(passwordValue)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0]).toBeInstanceOf(PasswordNotValidError)
  })

  test("should not create an password because password is invalid (uppercase issue)", () => {
    passwordValue = "mrjohndoe@99"
    
    const passwordResult = Password.create(passwordValue)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0]).toBeInstanceOf(PasswordNotValidError)
  })

  test("should not create an password because password is invalid (lowercase issue)", () => {
    passwordValue = "MRJOHNDOE@99"
    
    const passwordResult = Password.create(passwordValue)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0]).toBeInstanceOf(PasswordNotValidError)
  })

  test("should not create an password because password is invalid (special character issue)", () => {
    passwordValue = "MrJohnDoe99"
    
    const passwordResult = Password.create(passwordValue)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0]).toBeInstanceOf(PasswordNotValidError)
  })

  test("should not create an password because password is invalid (numeric issue)", () => {
    passwordValue = "MrJohnDoe@"
    
    const passwordResult = Password.create(passwordValue)
  
    expect(passwordResult.isSuccess).toBe(false)
    expect(passwordResult.values).toBe(undefined)
  
    const passwordErrors = passwordResult.getErrors()
  
    expect(passwordErrors.length).toBe(1)
    expect(passwordErrors[0]).toBeInstanceOf(PasswordNotValidError)
  })
})