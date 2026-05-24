import { EntitySchema, DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

import { getORMEntities } from "./getFiles"

let ormEntityClasses: EntitySchema<any>[] = []
export let appDataSource: DataSource 

export async function createDataSource() {
  ormEntityClasses = await getORMEntities()
  
  // Configuration différente pour tests vs production
  const isTestMode = process.env.CI === 'true'
  const port = isTestMode ? 5433 : 5432
  const database = isTestMode ? 'test_db' : 'postgres'
  const password = isTestMode ? 'testpass' : 'admin'
  
  appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST || 'localhost',
    port: port,
    username: "postgres",
    password,
    database,
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ormEntityClasses
  })

  appDataSource.initialize().then(() => {
    console.info(`database initialized (mode: ${isTestMode ? 'TEST' : 'PROD'})`)
  }).catch((err) => {
    console.error(err)
  })
}