import ListEntity from "../entities/list"

export interface IListRepository {
  findAll(): Promise<ListEntity[]>
  findOneByUuid(uuid: string): Promise<ListEntity>
  save(props: any): Promise<void>
}