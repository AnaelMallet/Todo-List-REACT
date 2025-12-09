import { v4 as uuid } from "uuid"

import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"

import { listTestRepository, taskTestRepository } from "../../../infra/databases/repositories"
import { TaskNotExistError } from "../../../errors"

import { ListPropsDto } from "../../list/create/dto"
import { CreateListUseCase } from "../../list/create/use-case"

import { CreateTaskUseCase } from "../upsert/create-useCase"
import { TaskPropsDto } from "../upsert/dto"

import { DeleteTaskUseCase } from "./use-case"

describe("test the deleteTask use-case", () => {
    const deleteTaskUseCase = new DeleteTaskUseCase(taskTestRepository)

    const taskUuid = uuid()
    const listUuid = uuid()
    
    const taskProps: TaskPropsDto = {
        uuid: taskUuid,
        title: "task title",
        description: "task description",
        listId: listUuid
    }

    beforeAll(async () => {
        const userUuid = uuid()

        const listProps: ListPropsDto = {
            uuid: listUuid,
            name: "Task for today",
            userId: userUuid
        }
        const userProps: userPropsDto = {
            uuid: userUuid,
            firstname: "john",
            lastname: "smith",
            email: "gfhib@ujfd.fr",
            username: "john Smith",
            password: "rhngwAELN2C@B58j",
            confirmationPassword: "rhngwAELN2C@B58j"
        }

        const createUserUseCase = new  CreateUserUseCase(userTestRepository)
        const createListUseCase = new CreateListUseCase(listTestRepository)
        const createTaskUseCase = new CreateTaskUseCase(taskTestRepository)

        await createUserUseCase.execute(userProps)
        await createListUseCase.execute(listProps)
        await createTaskUseCase.execute(taskProps)
    })

    test("Should delete a task", async () => {
        const deleteTaskResult = await deleteTaskUseCase.execute(taskUuid)

        expect(deleteTaskResult.isSuccess).toBe(true)
    })

    test("should not delete a task because task not exist", async () => {
        const taskUuid = uuid()
        const props = { ...taskProps }

        props.uuid = taskUuid

        const deleteTaskResult = await deleteTaskUseCase.execute(props.uuid)

        expect(deleteTaskResult.isSuccess).toBe(false)

        const deleteTaskErrors = deleteTaskResult.getErrors()

        expect(deleteTaskErrors.length).toBe(1)
        expect(deleteTaskErrors[0]).toBeInstanceOf(TaskNotExistError)
    })
})