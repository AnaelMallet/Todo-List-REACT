import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { ListDomainRepository } from "../../repositories/implementations/listDomainRepository"
import { ListNotExistError } from "../../errors"

import { updateListDto } from "./dto"

export class UpdateListUseCase implements BasicUseCase {
  repository: ListDomainRepository

  constructor(repository: ListDomainRepository) {
    this.repository = repository
  }

  async execute(args: updateListDto): Promise<Result<void>> {
    const {
      uuid,
      name
    } = args

    const foundListResult = await this.repository.findOneByUuid(uuid)

    if (foundListResult.isFailure) {
      return Result.fail(new ListNotExistError())
    }

    const list = foundListResult.getValue()

    list.updateName(name)

    await this.repository.save(list)

    return Result.ok()
  }
}