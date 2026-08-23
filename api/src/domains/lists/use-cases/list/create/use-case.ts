import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { IListDomainRepository } from "../../..//repositories/I_ListDomainRepository"
import { List } from "../../../entities/list"

import { ListPropsDto } from "./dto"

export class CreateListUseCase implements BasicUseCase {
  repository: IListDomainRepository

  constructor(repository: IListDomainRepository) {
    this.repository = repository
  }

  async execute(args: ListPropsDto): Promise<Result<void>> {
    const {
      uuid,
      name,
      isFavorite,
      userId
    } = args

    const listResult = List.create({
      name,
      isFavorite,
      userId
    }, uuid)

    if (listResult.isFailure === true) {
      return Result.fail(listResult.getErrors())
    }

    const list = listResult.getValue()

    await this.repository.save(list)

    return Result.ok()
  }
}