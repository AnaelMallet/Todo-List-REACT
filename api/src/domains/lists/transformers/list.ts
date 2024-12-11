import { BasicTransformer } from "@shared/basicTransformer"
import { Result } from "@shared/Results"

import UserEntity from "src/domains/users/infra/databases/entities/user"

import ListEntity from "../infra/databases/entities/list"
import { List, ListProps } from "../entities/list"

export class ListTransformer extends BasicTransformer<List, ListEntity> {
  async toDomain(databaseEntity: ListEntity): Promise<Result<List>> {
      const props: ListProps = {
        name: databaseEntity.name,
        isFavorite: databaseEntity.isFavorite,
        userId: databaseEntity.user.uuid
      }

      const domainList = List.create(props, databaseEntity.uuid)

      return domainList
  }

  async toDatabase(domainEntity: List): Promise<ListEntity> {
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