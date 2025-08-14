import { EntitySchema, DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

import { getORMEntities } from "./getFiles"

let ormEntityClasses: EntitySchema<any>[] = []
export let appDataSource: DataSource 

export async function createDataSource() {
  ormEntityClasses = await getORMEntities()
  
  appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "postgres",
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ormEntityClasses
  })

  appDataSource.initialize().then(() => {
    console.info("database is initialized")
  }).catch((err) => {
    console.error(err)
  })
}