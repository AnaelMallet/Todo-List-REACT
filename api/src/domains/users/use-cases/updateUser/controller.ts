import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"

import { graphqlProps } from "../../infra/graphql/resolvers"

import { UpdateUserUseCase } from "./use-case"

export class UpdateUserController implements BasicController {
  useCase: UpdateUserUseCase

  constructor(useCase: UpdateUserUseCase) {
    this.useCase = useCase
  }
  
  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const {
      args
    } = props

    const userResult = await this.useCase.execute(args.input)

    if (userResult.isFailure === true) {
      return Result.fail(userResult.getErrors())
    }

    return Result.ok()
  }
}