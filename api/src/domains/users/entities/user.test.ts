import { Email } from "../value-objects/email"
import { Password } from "../value-objects/password"

import { User, UserProps } from "./user"

const emailResult = Email.create("john.doe@gmail.com")
const email = emailResult.getValue()

const passwordResult = Password.create("JohnDoe@9999")
const password = passwordResult.getValue()

const userProps: UserProps = {
  firstname: "john",
  lastname: "doe",
  username: "jdoe",
  email,
  password,
}

test("Should create an user", () => {
  const userResult = User.create(userProps)

  expect(userResult.isSuccess).toBe(true)

  const user = userResult.getValue()

  expect(user.props.firstname).toBe(userProps.firstname)
  expect(user.props.lastname).toBe(userProps.lastname)
  expect(user.props.username).toBe(userProps.username)
  expect(user.props.email).toBe(userProps.email)
  expect(user.props.password).toBe(userProps.password)
})

test("Should create an user even if username is undefined", () => {
  const props = {...userProps}

  props.username = undefined

  const userResult = User.create(props)

  expect(userResult.isSuccess).toBe(true)

  const user = userResult.getValue()

  expect(user.props.firstname).toBe(userProps.firstname)
  expect(user.props.lastname).toBe(userProps.lastname)
  expect(user.props.username).toBe(undefined)
  expect(user.props.email).toBe(userProps.email)
  expect(user.props.password).toBe(userProps.password)
})

test("Should not create an user because firstname is undefined", () => {
  const props = {...userProps}

  props.firstname = undefined

  const userResult = User.create(props)

  expect(userResult.isSuccess).toBe(false)
  expect(userResult.value).toBe(undefined)

  const userErrors = userResult.getErrors()

  expect(userErrors.length).toBe(1)
  expect(userErrors[0].message).toBe("againstNullOrUndefined")
})

test("Should not create an user because lastname is undefined", () => {
  const props = {...userProps}

  props.lastname = undefined

  const userResult = User.create(props)

  expect(userResult.isSuccess).toBe(false)
  expect(userResult.value).toBe(undefined)

  const userErrors = userResult.getErrors()

  expect(userErrors.length).toBe(1)
  expect(userErrors[0].message).toBe("againstNullOrUndefined")
})

test("Should not create an user because email is undefined", () => {
  const props = {...userProps}

  props.email = undefined

  const userResult = User.create(props)

  expect(userResult.isSuccess).toBe(false)
  expect(userResult.value).toBe(undefined)

  const userErrors = userResult.getErrors()

  expect(userErrors.length).toBe(1)
  expect(userErrors[0].message).toBe("againstNullOrUndefined")
})

test("Should not create an user because password is undefined", () => {
  const props = {...userProps}

  props.password = undefined

  const userResult = User.create(props)

  expect(userResult.isSuccess).toBe(false)
  expect(userResult.value).toBe(undefined)

  const userErrors = userResult.getErrors()

  expect(userErrors.length).toBe(1)
  expect(userErrors[0].message).toBe("againstNullOrUndefined")
})