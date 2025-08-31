import ListEntity from "../entities/list"

export interface IListRepository {
  findAllByUserId(uuid: string): Promise<ListEntity[]>
  findOneByUuid(uuid: string): Promise<ListEntity>
  save(props: any): Promise<void>
  deleteOneByUuid(uuid: string): Promise<void>
}