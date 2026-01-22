import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { UpdateListUseCase } from "./use-case"

export class UpdateListController implements BasicController {
  useCase: UpdateListUseCase

  constructor(useCase: UpdateListUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const {
      args
    } = props

    const updateListResult = await this.useCase.execute(args.input)

    if (updateListResult.isFailure) {
      return Result.fail(updateListResult.getErrors())
    }

    return Result.ok()
  }
}