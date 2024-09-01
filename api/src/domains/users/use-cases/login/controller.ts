import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"

import { graphqlProps } from "../../infra/graphql/resolvers"

import { LoginUserUseCase } from "./use-case"

export class LoginUserController implements BasicController {
  useCase: LoginUserUseCase

  constructor(useCase: LoginUserUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const {
      args
    } = props

    const loginUserResult = await this.useCase.execute(args.input)

    if (loginUserResult.isFailure === true) {
      return Result.fail(loginUserResult.getErrors())
    }

    const userLoginData = loginUserResult.getValue()

    return Result.ok(userLoginData)
  }
}