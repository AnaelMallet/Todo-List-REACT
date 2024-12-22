import { BasicTransformer } from "@shared/basicTransformer"
import { Result } from "@shared/Results"

import UserEntity from "src/domains/users/infra/databases/entities/user"

import ListEntity from "../infra/databases/entities/list"
import { List, ListProps } from "../entities/list"

export class ListTransformer extends BasicTransformer<List, ListEntity> {
  arrayToDomain(databaseEntities: ListEntity[]): Result<List[]> {
    const domainLists: List[] = []
    
    for (const databaseEntity of databaseEntities) {
      const domainList = this.toDomain(databaseEntity)

      domainLists.push(domainList.getValue())
    }

    return Result.ok(domainLists)
  }

  toDomain(databaseEntity: ListEntity): Result<List> {
      const props: ListProps = {
        name: databaseEntity.name,
        isFavorite: databaseEntity.isFavorite,
        userId: databaseEntity.user.uuid
      }

      const list = List.create(props, databaseEntity.uuid)

      return list
  }

  toDatabase(domainEntity: List): ListEntity {
      const entityList = new ListEntity()
      const userEntity = new UserEntity()

      userEntity.uuid = domainEntity.userId
      
      entityList.uuid = domainEntity.uuid
      entityList.name = domainEntity.name
      entityList.isFavorite = domainEntity.isFavorite
      entityList.user = userEntity

      return entityList
  }
}