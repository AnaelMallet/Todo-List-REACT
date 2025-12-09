import ListEntity from "./list"

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm"

@Entity({ name: "tasks" })
export default class TaskEntity extends BaseEntity {
    @PrimaryColumn()
    uuid: string

    @Column("varchar", { length: 64 })
    title: string

    @Column("text")
    description: string

    @Column("bool", { default: false })
    isDone: boolean

    @ManyToOne(() => ListEntity, list => list.tasks)
    list: ListEntity

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}