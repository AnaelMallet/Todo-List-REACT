import { Result } from "@shared/Results"

import { List } from "../entities/list"

export interface IListDomainRepository {
  findAllByUserId(uuid: string): Promise<Result<List[]>>
  findOneByUuid(uuid: string): Promise<Result<List>>
  save(props: List): Promise<void>
  deleteOneByUuid(uuid: string): Promise<void>
}