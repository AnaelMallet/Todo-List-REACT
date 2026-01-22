import { v4 as uuid } from "uuid"

import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"

import { listTestRepository, taskTestRepository } from "../../../infra/databases/repositories"

import { CreateTaskUseCase } from "./create-useCase"
import { TaskPropsDto } from "./dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"
import { ListPropsDto } from "../../list/create/dto"
import { CreateListUseCase } from "../../list/create/use-case"

describe("test the createTask use-case", () => {
    const createTaskUseCase = new CreateTaskUseCase(taskTestRepository)

    const listUuid = uuid()
    const taskProps: TaskPropsDto = {
        title: "today's task",
        description: "description of the today's task",
        listId: listUuid
    }

    beforeAll(async() => {
        const userUuid = uuid()
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
            name: "task for today",
            userId: userUuid
        }

        const createUserUseCase = new CreateUserUseCase(userTestRepository)
        const createListUseCase = new CreateListUseCase(listTestRepository)

        await createUserUseCase.execute(userProps)
        await createListUseCase.execute(listProps)
    })

    test("Should create a task", async () => {
        const createTaskResult = await createTaskUseCase.execute(taskProps)

        expect(createTaskResult.isSuccess).toBe(true)
    })
})