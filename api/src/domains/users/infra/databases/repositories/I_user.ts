import UserEntity from "../entities/user"

export interface IUserRepository {
  findOneByUuid(uuid: string): Promise<UserEntity | null>
  findOneByEmail(email: string): Promise<UserEntity | null>
  save(props: any): Promise<void>
}