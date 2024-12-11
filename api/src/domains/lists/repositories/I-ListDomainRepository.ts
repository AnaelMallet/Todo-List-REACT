import { Result } from "@shared/Results"

import { List } from "../entities/list"

export interface IListDomainRepository {
  findAll(): Promise<Result<List[]>>
  findOneByUuid(uuid: string): Promise<Result<List>>
  save(props: any): Promise<void>
}