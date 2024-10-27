import { EmailNotValidError } from "../errors"
import { Email } from "./email"

describe("test the email value-object", () => {
  let emailValue = "john.doe@gmail.com"
  
  test("should create an email", () => {
    const emailResult = Email.create(emailValue)
  
    expect(emailResult.isSuccess).toBe(true)
  
    const email = emailResult.getValue()
  
    expect(email.value).toBe(emailValue)
  })
  
  test("should not create an email because email is undefined", () => {
    const emailResult = Email.create(undefined)
  
    expect(emailResult.isSuccess).toBe(false)
    expect(emailResult.values).toBe(undefined)
  
    const emailErrors = emailResult.getErrors()
  
    expect(emailErrors.length).toBe(1)
    expect(emailErrors[0].message).toBe("againstNullOrUndefined")
  })
  
  test("should not create an email because email is invalid", () => {
    emailValue = "john.doe-gmail.com"
    
    const emailResult = Email.create(emailValue)
  
    expect(emailResult.isSuccess).toBe(false)
    expect(emailResult.values).toBe(undefined)
  
    const emailErrors = emailResult.getErrors()
  
    expect(emailErrors.length).toBe(1)
    expect(emailErrors[0]).toBeInstanceOf(EmailNotValidError)
  })
})