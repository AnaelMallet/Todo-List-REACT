import { Result } from "@shared/Results"

import { List } from "../../../entities/list"
import { IListDomainRepository } from "../../../repositories/I_ListDomainRepository"

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

    return Promise.resolve(Result.ok(foundList))
  }

  save(list: List): Promise<void> {
    const foundListIndex = this.array.findIndex(prop => prop.uuid === list.uuid)
  
    if (foundListIndex !== -1) {
      this.array[foundListIndex].props = list.props

      return Promise.resolve()
    }
    
    if (list.hasOwnProperty("isFavorite")) {
      this.array.push(list)
    } else {
      Object.assign(list.props, { isFavorite: false })
      
      this.array.push(list)
    }

    return Promise.resolve()
  }

  deleteOneByUuid(uuid: string): Promise<void> {
    this.array.filter(list => list.uuid !== uuid)
    
    return Promise.resolve()
  }
}