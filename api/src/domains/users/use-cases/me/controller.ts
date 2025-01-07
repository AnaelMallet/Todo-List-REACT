import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { UserMeUseCase } from "./use-case"

export class UserMeController implements BasicController {
  useCase: UserMeUseCase

  constructor(useCase: UserMeUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const { args } = props

    const userMeResult = await this.useCase.execute(args.userId)

    if (userMeResult.isFailure === true) {
      return Result.fail(userMeResult.getErrors())
    }

    const userInfo = userMeResult.getValue()

    return Result.ok(userInfo)
  }
}