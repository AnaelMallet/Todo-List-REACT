import UserEntity from "src/domains/users/infra/databases/entities/user"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm"

@Entity({ name: "lists" })
export default class ListEntity extends BaseEntity {
  @PrimaryColumn()
  uuid: string

  @Column("varchar", { length: 64 })
  name: string

  @Column("bool", { default: false })
  isFavorite: boolean

  @ManyToOne(() => UserEntity, user => user.lists)
  user: UserEntity

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}