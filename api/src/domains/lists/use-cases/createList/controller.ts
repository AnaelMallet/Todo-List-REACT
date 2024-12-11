import { BasicController } from "@shared/basicController"
import { graphqlProps } from "@shared/basicResolvers"
import { Result } from "@shared/Results"
import { CreateListuseCase } from "./use-case"

export class CreateListController implements BasicController {
  useCase: CreateListuseCase

  constructor(useCase: CreateListuseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const {
      args,
      context
    } = props

    const input = {
      ...args.input,
      userId: context.user.userId
    }

    const createListResult = await this.useCase.execute(input)

    if (createListResult.isFailure === true) {
      return Result.fail(createListResult.getErrors())
    }

    return Result.ok()
  }
}