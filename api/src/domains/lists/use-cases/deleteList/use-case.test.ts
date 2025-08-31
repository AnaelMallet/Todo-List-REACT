import { v4 as uuid } from "uuid"

import { listTestRepository } from "../../infra/databases/repositories"

import { DeleteListUseCase } from "./use-case"
import { listPropsDto } from "../createList/dto"
import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"
import { userTestRepository } from "src/domains/users/infra/databases/repositories"
import { createListUseCase } from "../createList"
import { CreateListUseCase } from "../createList/use-case"
import { ListNotExistError } from "../../errors"

describe("test the deleteList use-case", () => {
    const deleteListUseCase = new DeleteListUseCase(listTestRepository)

    const userUuid = uuid()
    const listUuid = uuid()
    const listProps: listPropsDto = {
        uuid: listUuid,
        name: "task for today",
        isFavorite: false,
        userId: userUuid
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

        await createUserUseCase.execute(userProps)

        const createListUseCase = new CreateListUseCase(listTestRepository)

        await createListUseCase.execute(listProps)
    })

    test("should delete a list", async () => {
        const deleteListResult = await deleteListUseCase.execute(listUuid)

        expect(deleteListResult.isSuccess).toBe(true)
    })

        test("should not delete list because list not found", async () => {
        const listUuid = uuid()
        const props = {...listProps}

        props.uuid = listUuid

        const deleteListResult = await deleteListUseCase.execute(props.uuid)

        expect(deleteListResult.isSuccess).toBe(false)

        const deleteListErrors = deleteListResult.getErrors()

        expect(deleteListErrors.length).toBe(1)
        expect(deleteListErrors[0]).toBeInstanceOf(ListNotExistError)
    })
})