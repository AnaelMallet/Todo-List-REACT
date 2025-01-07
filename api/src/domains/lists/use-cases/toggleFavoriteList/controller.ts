import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { ToggleFavoriteListUseCase } from "./use-case"
import { toggleFavoriteDto } from "./dto"

export class ToggleFavoriteListController implements BasicController {
  useCase: ToggleFavoriteListUseCase

  constructor(useCase: ToggleFavoriteListUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
      const {
        args,
        context
      } = props

      const dto: toggleFavoriteDto = {
        ...args,
        userId: context.user.userId
      }

      const toggleIsFavoriteResult = await this.useCase.execute(dto)

      if (toggleIsFavoriteResult.isFailure) {
        return Result.fail(toggleIsFavoriteResult.getErrors())
      }

      return Result.ok()
  }
}