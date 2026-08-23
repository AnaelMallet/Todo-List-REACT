import { v4 as uuid } from "uuid"
import { describe, test, expect, beforeAll } from "@jest/globals"

import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"

import { listTestRepository, taskTestRepository } from "../../../infra/databases/repositories"
import { TaskNotExistError } from "../../../errors"

import { ListPropsDto } from "../../list/create/dto"
import { CreateListUseCase } from "../../list/create/use-case"

import { CreateTaskUseCase } from "../upsert/create-useCase"
import { TaskPropsDto } from "../upsert/dto"

import { ToggleDoneTaskUseCase } from "./use-case"

describe("test the toggleDoneTask use-case", () => {
    const userUuid = uuid()
    const listUuid = uuid()
    const taskUuid = uuid()

    const createTaskUseCase = new CreateTaskUseCase(taskTestRepository)
    const taskProps: TaskPropsDto = {
        uuid: taskUuid,
        title: "task title",
        description: "task description",
        isDone: false,
        listId: listUuid
    }

    const toggleDoneTaskUseCase = new ToggleDoneTaskUseCase(taskTestRepository)

    beforeAll(async() => {
        const userProps: userPropsDto = {
            uuid: userUuid,
            firstname: "john",
            lastname: "smith",
            email: "gfhib@ujfd.fr",
            username: "john Smith",
            password: "rhngwAELN2C@B58j",
            confirmationPassword: "rhngwAELN2C@B58j"
        }
        const listProps: ListPropsDto = {
            uuid: listUuid,
            name: "Task for today",
            isFavorite: false,
            userId: userUuid
        }

        const createUserUseCase = new CreateUserUseCase(userTestRepository)
        const createListUseCase = new CreateListUseCase(listTestRepository)

        await createUserUseCase.execute(userProps)
        await createListUseCase.execute(listProps)
        await createTaskUseCase.execute(taskProps)
    })

    test("should update the task to be done", async () => {
        const toggleDoneTaskResult = await toggleDoneTaskUseCase.execute(taskUuid)

        expect(toggleDoneTaskResult.isSuccess).toBe(true)

        const taskResult = await taskTestRepository.findOneByUuid(taskUuid)
        const task = taskResult.getValue()

        expect(task.isDone).toBe(true)
    })

    test("should update the same task to be undone", async () => {
        const toggleDoneTaskResult = await toggleDoneTaskUseCase.execute(taskUuid)

        expect(toggleDoneTaskResult.isSuccess).toBe(true)

        const taskResult = await taskTestRepository.findOneByUuid(taskUuid)
        const task = taskResult.getValue()

        expect(task.isDone).toBe(false)
    })

    test("should not update the task because the task don't exist", async () => {
        const toggleDoneTaskResult = await toggleDoneTaskUseCase.execute(uuid())

        expect(toggleDoneTaskResult.isSuccess).toBe(false)

        const toggleDoneTaskErrors = toggleDoneTaskResult.getErrors()
        
        expect(toggleDoneTaskErrors.length).toBe(1)
        expect(toggleDoneTaskErrors[0]).toBeInstanceOf(TaskNotExistError)
    })
})