import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { ToggleDoneTaskUseCase } from "./use-case"

export class ToggleDoneTaskController implements BasicController {
    useCase: ToggleDoneTaskUseCase

    constructor(useCase: ToggleDoneTaskUseCase) {
        this.useCase = useCase
    }

    async executeImplementation(props: graphqlProps): Promise<Result<any>> {
        const { args } = props

        const toggleIsDoneResult = await this.useCase.execute(args.taskUuid)

        if (toggleIsDoneResult.isFailure) {
            return Result.fail(toggleIsDoneResult.getErrors())
        }

        return Result.ok()
    }
}