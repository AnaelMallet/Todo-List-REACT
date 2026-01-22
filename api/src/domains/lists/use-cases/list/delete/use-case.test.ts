import { v4 as uuid } from "uuid"

import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"

import { listTestRepository, taskTestRepository } from "../../../infra/databases/repositories"
import { ListNotExistError, UndoneTaskFoundError } from "../../../errors"

import { ListPropsDto } from "../create/dto"
import { CreateListUseCase } from "../create/use-case"
import { TaskPropsDto } from "../../task/upsert/dto"
import { CreateTaskUseCase } from "../../task/upsert/create-useCase"
import { ToggleDoneTaskUseCase } from "../../task/toggleIsDone/use-case"

import { DeleteListUseCase } from "./use-case"

describe("test the deleteList use-case", () => {
    const deleteListUseCase = new DeleteListUseCase(listTestRepository, taskTestRepository)

    const userUuid = uuid()
    const listUuid = uuid()
    const taskUuid = uuid()
    const listProps: ListPropsDto = {
        uuid: listUuid,
        name: "task for today",
        userId: userUuid
    }
    const taskProps: TaskPropsDto = {
        uuid: taskUuid,
        title: "task title",
        description: "task description",
        listId: listUuid
    }

    beforeAll(async () => {
        const userProps: userPropsDto = {
            uuid: userUuid,
            firstname: "john",
            lastname: "smith",
            email: "gfhib@ujfd.fr",
            username: "john Smith",
            password: "rhngwAELN2C@B58j",
            confirmationPassword: "rhngwAELN2C@B58j"
        }

        const createUserUseCase = new CreateUserUseCase(userTestRepository)
        const createListUseCase = new CreateListUseCase(listTestRepository)

        await createUserUseCase.execute(userProps)
        await createListUseCase.execute(listProps)
    })

    test("should delete a list bacause it does not contain any tasks", async () => {
        const deleteListResult = await deleteListUseCase.execute(listUuid)

        expect(deleteListResult.isSuccess).toBe(true)
    })

    test("should delete a list bacause all tasks are done", async () => {
        const createTaskUseCase = new CreateTaskUseCase(taskTestRepository)
        const toggleIsDoneUseCase = new ToggleDoneTaskUseCase(taskTestRepository)

        await createTaskUseCase.execute(taskProps)
        await toggleIsDoneUseCase.execute(taskProps.uuid)
        
        const deleteListResult = await deleteListUseCase.execute(listUuid)

        expect(deleteListResult.isSuccess).toBe(true)
    })

    test("should not delete list because list not exist", async () => {
        const listUuid = uuid()
        const props = {...listProps}

        props.uuid = listUuid

        const deleteListResult = await deleteListUseCase.execute(props.uuid)

        expect(deleteListResult.isSuccess).toBe(false)

        const deleteListErrors = deleteListResult.getErrors()

        expect(deleteListErrors.length).toBe(1)
        expect(deleteListErrors[0]).toBeInstanceOf(ListNotExistError)
    })

    test("should not delete a list because it has some undone tasks", async () => {
        const createTaskUseCase = new CreateTaskUseCase(taskTestRepository)

        const newTaskProps = {...taskProps}

        newTaskProps.uuid = uuid()

        await createTaskUseCase.execute(newTaskProps)
        
        const deleteListResult = await deleteListUseCase.execute(listUuid)

        expect(deleteListResult.isSuccess).toBe(false)

        const deleteListErrors = deleteListResult.getErrors()

        expect(deleteListErrors.length).toBe(1)
        expect(deleteListErrors[0]).toBeInstanceOf(UndoneTaskFoundError)
    })
})