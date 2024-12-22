import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { List } from "../../entities/list"
import { ListDomainRepository } from "../../repositories/implementations/listDomainRepository"

type ListInfo = {
  uuid: string
  name: string
  isFavorite: boolean
}

export class ListsUseCase implements BasicUseCase {
  repository: ListDomainRepository

  constructor(repository: ListDomainRepository) {
    this.repository = repository
  }

  async execute(userId: string): Promise<Result<ListInfo[]>> {
    const allListsResult = await this.repository.findAllByUserId(userId)
    const lists: ListInfo[] = []

    for (const list of allListsResult.getValue()) {
      lists.push({
        uuid: list.uuid,
        name: list.name,
        isFavorite: list.isFavorite
      })
    }

    return Result.ok(lists)
  }
}