import { Result } from "@shared/Results"

import { List } from "../../../entities/list"
import { IListDomainRepository } from "../../../repositories/I-ListDomainRepository"

export class ListTestRepository implements IListDomainRepository {
  array: List[] = []
  repository: null

  findAllByUserId(uuid: string): Promise<Result<List[]>> {
    const foundLists = this.array.filter(list => list.userId === uuid)

    return Promise.resolve(Result.ok(foundLists))
  }

  findOneByUuid(uuid: string): Promise<Result<List>> {
    const foundList = this.array.find(list => list.uuid === uuid)

    if (foundList === undefined) {
      return Promise.resolve(Result.fail())
    }

    const foundListResult = Result.ok(foundList)

    return Promise.resolve(foundListResult)
  }

  save(props: any): Promise<void> {
    this.array.push(props)

    return Promise.resolve()
  }
}