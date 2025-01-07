import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { ListDomainRepository } from "../../repositories/implementations/listDomainRepository"
import { FavoriteListNumberReachError, ListNotExistError } from "../../errors"

import { toggleFavoriteDto } from "./dto"

export class ToggleFavoriteListUseCase implements BasicUseCase {

  repository: ListDomainRepository

  constructor(repository: ListDomainRepository) {
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
      
      const allListsResult = await this.repository.findAllByUserId(userId)

      const list = foundListResult.getValue()
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