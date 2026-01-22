import { v4 as uuid } from "uuid"

import { AgainstNullOrUndefinedError } from "@shared/basicErrors"

import { Task, TaskProps } from "./task"

describe("test the task entity", () => {
    const listUuid = uuid()
    const taskProps: TaskProps = {
        listId: listUuid,
        title: "custom task",
        description: "custom task description"
    }

    test("Should create a task entity", async () => {
        const taskResult = Task.create(taskProps)

        expect(taskResult.isSuccess).toBe(true)
    })

    test("Should not create a task entity because title is undefined", async () => {
        const props = {...taskProps}

        props.title = undefined

        const taskResult = Task.create(props)

        expect(taskResult.isSuccess).toBe(false)
        expect(taskResult.values).toBe(undefined)

        const taskErrors = taskResult.getErrors()

        expect(taskErrors.length).toBe(1)
        expect(taskErrors[0]).toBeInstanceOf(AgainstNullOrUndefinedError)
    })

    test("Should not create a task entity because description is undefined", async () => {
        const props = {...taskProps}

        props.description = undefined

        const taskResult = Task.create(props)

        expect(taskResult.isSuccess).toBe(false)
        expect(taskResult.values).toBe(undefined)

        const taskErrors = taskResult.getErrors()

        expect(taskErrors.length).toBe(1)
        expect(taskErrors[0]).toBeInstanceOf(AgainstNullOrUndefinedError)
    })

        test("Should not create a task entity because listId is undefined", async () => {
        const props = {...taskProps}

        props.listId = undefined

        const taskResult = Task.create(props)

        expect(taskResult.isSuccess).toBe(false)
        expect(taskResult.values).toBe(undefined)

        const taskErrors = taskResult.getErrors()

        expect(taskErrors.length).toBe(1)
        expect(taskErrors[0]).toBeInstanceOf(AgainstNullOrUndefinedError)
    })
})