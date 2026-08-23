import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { IListDomainRepository } from "../../../repositories/I_ListDomainRepository"
import { ListNotExistError } from "../../../errors"

import { updateListDto } from "./dto"

export class UpdateListUseCase implements BasicUseCase {
  repository: IListDomainRepository

  constructor(repository: IListDomainRepository) {
    this.repository = repository
  }

  async execute(args: updateListDto): Promise<Result<void>> {
    const {
      uuid,
      name
    } = args

    const foundListResult = await this.repository.findOneByUuid(uuid as string)

    if (foundListResult.isFailure) {
      return Result.fail(new ListNotExistError())
    }

    const list = foundListResult.getValue()

    list.updateName(name)

    await this.repository.save(list)

    return Result.ok()
  }
}