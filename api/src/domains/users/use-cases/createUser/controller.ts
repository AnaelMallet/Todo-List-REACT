import { Result } from "@shared/Results"
import { BasicController } from "@shared/basicController" 
import { graphqlProps } from "@shared/basicResolvers"

import { CreateUserUseCase } from "./use-case"

export class CreateUserController implements BasicController {
  useCase: CreateUserUseCase

  constructor(useCase: CreateUserUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<void>> {
    const { args } = props

    const createUserResult = await this.useCase.execute(args.input)

    if (createUserResult.isFailure === true) {
      return Result.fail(createUserResult.getErrors())
    }

    return Result.ok()
  }
}