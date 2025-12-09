import { v4 as uuid } from "uuid"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"
import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"

import { TaskNotExistError } from "../../../errors"
import { listTestRepository, taskTestRepository } from "../../../infra/databases/repositories"

import { ListPropsDto } from "../../list/create/dto"
import { CreateListUseCase } from "../../list/create/use-case"

import { TaskPropsDto } from "./dto"
import { UpdateTaskUseCase } from "./update-useCase"
import { CreateTaskUseCase } from "./create-useCase"
import { taskDomainRepository } from "src/domains/lists/repositories/implementations"

describe("test the updateTask use-case", () => {
    const userUuid = uuid()
    const listUuid = uuid()
    const taskUuid = uuid()

    const createTaskUseCase = new CreateTaskUseCase(taskTestRepository)
    const taskProps: TaskPropsDto = {
        uuid: taskUuid,
        title: "Task title",
        description: "task description",
        listId: listUuid
    }

    const updateTaskUseCase = new UpdateTaskUseCase(taskTestRepository)
    const updateTaskProps: TaskPropsDto = {
        uuid: taskUuid,
        title: "Titre de la tâche",
        description: "Description de la tâche",
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
        const listProps: ListPropsDto = {
            uuid: listUuid,
            name: "Task for today",
            userId: userUuid
        }

        const createUserUseCase = new CreateUserUseCase(userTestRepository)
        const createListUseCase = new CreateListUseCase(listTestRepository)

        await createUserUseCase.execute(userProps)
        await createListUseCase.execute(listProps)
        await createTaskUseCase.execute(taskProps)
    })

    test("should update the task", async () => {
        const updateTaskResult = await updateTaskUseCase.execute(updateTaskProps)

        expect(updateTaskResult.isSuccess).toBe(true)

        const taskResult = await taskTestRepository.findOneByUuid(updateTaskProps.uuid)
        const task = taskResult.getValue()

        expect(task.title).toBe(updateTaskProps.title)
        expect(task.description).toBe(updateTaskProps.description)
    })

    test("should not update the task because the task don't exist", async () => {
        const newUpdateTaskProps = { ...updateTaskProps }

        newUpdateTaskProps.uuid = uuid()

        const updateTaskResult = await updateTaskUseCase.execute(newUpdateTaskProps)

        expect(updateTaskResult.isSuccess).toBe(false)

        const updateTaskErrors = updateTaskResult.getErrors()

        expect(updateTaskErrors.length).toBe(1)
        expect(updateTaskErrors[0]).toBeInstanceOf(TaskNotExistError)
    })
})