import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { DeleteListUseCase } from "./use-case"

export class DeleteListController implements BasicController {
  useCase: DeleteListUseCase

  constructor(useCase: DeleteListUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
      const {
        args
      } = props

      const deleteListResult = await this.useCase.execute(args.listUuid)

      if (deleteListResult.isSuccess === false) {
        return Result.fail(deleteListResult.getErrors())
      }

      return Result.ok()
  }
}