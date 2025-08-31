import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { ListDomainRepository } from "../../repositories/implementations/listDomainRepository"
import { ListNotExistError } from "../../errors"

export class DeleteListUseCase implements BasicUseCase {
  repository: ListDomainRepository

  constructor(repository: ListDomainRepository) {
    this.repository = repository
  }
  
  async execute(listId: string): Promise<Result<void>> {
      const foundList = await this.repository.findOneByUuid(listId)

      if (foundList.isSuccess === false) {
        return Result.fail(new ListNotExistError())
      }

      /**
       * TODO: prendre en compte les tâches au sein d'une liste.
       * 
       * - Si la liste peut être supprimé, il faut aussi supprimé
       * toute les tâches associées.
       * 
       * - Si la liste en question contient des tâches non terminé,
       * ne pas supprimé la liste.
       */

      await this.repository.deleteOneByUuid(listId)

      return Result.ok()
  }
}