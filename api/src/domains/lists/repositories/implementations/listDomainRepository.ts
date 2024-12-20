import { Result } from "@shared/Results"

import { List } from "../../entities/list"
import { ListRepository } from "../../infra/databases/repositories/implementations/user"
import { listTransformer } from "../../transformers"

import { IListDomainRepository } from "../I-ListDomainRepository"

export class ListDomainRepository implements IListDomainRepository {
  repository: ListRepository

  constructor(repository: ListRepository) {
    this.repository = repository
  }

  async findAll(): Promise<Result<List[]>> {
      const entityLists = await this.repository.findAll()
      const domainLists: List[] = []

      for (const list of entityLists) {
        const domainList = await listTransformer.toDomain(list)

        domainLists.push(domainList.getValue())
      }

      return Result.ok(domainLists)
  }

  async findOneByUuid(uuid: string): Promise<Result<List>> {
      const list = await this.repository.findOneByUuid(uuid)

      if (list === null) {
        return Result.fail()
      }

      return await listTransformer.toDomain(list)
  }

  async save(props: any): Promise<void> {
    const list = await listTransformer.toDatabase(props)

    await this.repository.save(list)
  }
}