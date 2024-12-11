import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { ListDomainRepository } from "../../repositories/implementations/listDomainRepository"
import { List } from "../../entities/list"

import { listPropsDto } from "./dto"

export class CreateListuseCase implements BasicUseCase {
  repository: ListDomainRepository

  constructor(repository: ListDomainRepository) {
    this.repository = repository
  }

  async execute(args: listPropsDto): Promise<Result<void>> {
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