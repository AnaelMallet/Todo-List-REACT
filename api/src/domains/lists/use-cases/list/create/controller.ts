import { BasicController } from "@shared/basicController"
import { graphqlProps } from "@shared/basicResolvers"
import { Result } from "@shared/Results"

import { CreateListUseCase } from "./use-case"
import { ListPropsDto } from "./dto"

export class CreateListController implements BasicController {
  useCase: CreateListUseCase

  constructor(useCase: CreateListUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const {
      args,
      context
    } = props

    const dto: ListPropsDto = {
      name: args.name,
      userId: context.user.userId
    }

    const createListResult = await this.useCase.execute(dto)

    if (createListResult.isFailure === true) {
      return Result.fail(createListResult.getErrors())
    }

    return Result.ok()
  }
}