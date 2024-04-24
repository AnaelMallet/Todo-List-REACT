import UserEntity from "../entities/user"

export interface IUserRepository {
  findOneByUuid(uuid: string): Promise<UserEntity>
  save(props: any): Promise<void>
}