import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { CreateTaskUseCase } from "./create-useCase"
import { UpdateTaskUseCase } from "./update-useCase"

export class UpsertTaskController implements BasicController {
    useCase: CreateTaskUseCase
    updateUseCase: UpdateTaskUseCase

    constructor(createUseCase: CreateTaskUseCase, updateUseCase: UpdateTaskUseCase) {
        this.useCase = createUseCase
        this.updateUseCase = updateUseCase
    }

    async executeImplementation(props: graphqlProps): Promise<Result<any>> {
        const { args } = props

        let upsertTaskResult = null

        if (args.input.uuid) {
            upsertTaskResult = await this.updateUseCase.execute(args.input)
        } else {
            upsertTaskResult = await this.useCase.execute(args.input)
        }

        if (upsertTaskResult.isFailure === true) {
            return Result.fail(upsertTaskResult.getErrors())
        }

        return Result.ok()
    }
}