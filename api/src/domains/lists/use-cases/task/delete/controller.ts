import { BasicController } from "@shared/basicController"
import { graphqlProps } from "@shared/basicResolvers"
import { Result } from "@shared/Results"

import { DeleteTaskUseCase } from "./use-case"

export class DeleteTaskController implements BasicController {
    useCase: DeleteTaskUseCase

    constructor(useCase: DeleteTaskUseCase) {
        this.useCase = useCase
    }

    async executeImplementation(props: graphqlProps): Promise<Result<any>> {
        const { args } = props
        const deleteTaskResult = await this.useCase.execute(args.taskUuid)

        if (deleteTaskResult.isFailure) {
            return Result.fail(deleteTaskResult.getErrors())
        }
        
        return Result.ok()
    }
}