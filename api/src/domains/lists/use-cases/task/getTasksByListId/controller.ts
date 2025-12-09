import { BasicController } from "@shared/basicController"
import { graphqlProps } from "@shared/basicResolvers"
import { Result } from "@shared/Results"

import { TasksUseCase } from "./use-case"

export class TasksController implements BasicController {
    useCase: TasksUseCase

    constructor(useCase: TasksUseCase) {
        this.useCase = useCase
    }

    async executeImplementation(props: graphqlProps): Promise<Result<any>> {
        const { args } = props

        const tasksResult = await this.useCase.execute(args.listUuid)
        const tasks = tasksResult.getValue()

        return Result.ok(tasks)
    }
}