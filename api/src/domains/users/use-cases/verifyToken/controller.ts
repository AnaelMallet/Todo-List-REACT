import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { UserVerifyTokenUseCase } from "./use-case"

export class UserVerifyTokenController implements BasicController {
  useCase: UserVerifyTokenUseCase

  constructor(useCase: UserVerifyTokenUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const { args } = props

    const userMeResult = await this.useCase.execute(args.userId)

    if (userMeResult.isFailure === true) {
      return Result.fail(userMeResult.getErrors())
    }

    const accessToken = userMeResult.getValue()

    return Result.ok({ accessToken })
  }
}