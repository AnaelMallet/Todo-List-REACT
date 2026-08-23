import ListEntity from "../entities/list"

export interface IListRepository {
  findAllByUserId(uuid: string): Promise<ListEntity[]>
  findOneByUuid(uuid: string): Promise<ListEntity | null>
  save(props: any): Promise<void>
  deleteOneByUuid(uuid: string): Promise<void>
}