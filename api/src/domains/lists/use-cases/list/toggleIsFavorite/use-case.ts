import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { IListDomainRepository } from "../../../repositories/I_ListDomainRepository"
import { FavoriteListNumberReachError, ListNotExistError } from "../../../errors"

import { toggleFavoriteDto } from "./dto"

export class ToggleFavoriteListUseCase implements BasicUseCase {
  repository: IListDomainRepository

  constructor(repository: IListDomainRepository) {
    this.repository = repository
  }

  async execute(dto: toggleFavoriteDto): Promise<Result<void>> {
      const {
        userId,
        listUuid
      } = dto

      const foundListResult = await this.repository.findOneByUuid(listUuid)
      
      if (foundListResult.isFailure) {
        return Result.fail(new ListNotExistError())
      }
      
      const list = foundListResult.getValue()

      const allListsResult = await this.repository.findAllByUserId(userId)
      const allLists = allListsResult.getValue()
      const favoriteListsNumber = allLists.filter(list => list.isFavorite === true).length

      if (favoriteListsNumber >= 5 && list.isFavorite === false) {
        return Result.fail(new FavoriteListNumberReachError())
      }

      list.toggleIsFavorite()

      await this.repository.save(list)

      return Result.ok()
  }
}