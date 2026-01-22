import { BasicController } from "@shared/basicController"
import { graphqlProps } from "@shared/basicResolvers"
import { Result } from "@shared/Results"

import { ListsUseCase } from "./use-case"

export class ListsController implements BasicController {
  useCase: ListsUseCase

  constructor(useCase: ListsUseCase) {
    this.useCase = useCase
  }
  
  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const { context } = props

    const listsResult = await this.useCase.execute(context.user.userId)
    const lists = listsResult.getValue()

    return Result.ok(lists)
  }
}