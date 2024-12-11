import { v4 as uuid } from "uuid"

import { List, ListProps } from "./list"

describe("test the list entity", () => {
  const userUuid = uuid()
  const listProps: ListProps = {
    name: "custom list",
    isFavorite: false,
    userId: userUuid
  }

  test("Should create a list entity", async () => {
    const listResult = List.create(listProps)

    expect(listResult.isSuccess).toBe(true)
  })

  test("should not create a list entity because name is undefined", async () => {
    const props = {...listProps}

    props.name = undefined

    const listResult = List.create(props)

    expect(listResult.isSuccess).toBe(false)
    expect(listResult.values).toBe(undefined)

    const listErrors = listResult.getErrors()

    expect(listErrors.length).toBe(1)
    expect(listErrors[0].message).toBe("againstNullOrUndefined")
  })

  test("should not create a list entity because isFavorite is undefined", async () => {
    const props = {...listProps}

    props.isFavorite = undefined

    const listResult = List.create(props)

    expect(listResult.isSuccess).toBe(false)
    expect(listResult.values).toBe(undefined)

    const listErrors = listResult.getErrors()

    expect(listErrors.length).toBe(1)
    expect(listErrors[0].message).toBe("againstNullOrUndefined")
  })

  test("should not create a list entity because userId is undefined", async () => {
    const props = {...listProps}

    props.userId = undefined

    const listResult = List.create(props)

    expect(listResult.isSuccess).toBe(false)
    expect(listResult.values).toBe(undefined)

    const listErrors = listResult.getErrors()

    expect(listErrors.length).toBe(1)
    expect(listErrors[0].message).toBe("againstNullOrUndefined")
  })
})