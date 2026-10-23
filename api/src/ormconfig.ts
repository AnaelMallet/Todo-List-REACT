import { EntitySchema, DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { getORMEntities } from "./getFiles";

let ormEntityClasses: EntitySchema<any>[] = [];
export let appDataSource: DataSource;

export async function createDataSource() {
  ormEntityClasses = await getORMEntities();

  // Configuration différente pour tests vs production
  appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ormEntityClasses,
  });

  appDataSource
    .initialize()
    .then(() => {
      console.info(`database initialized`);
    })
    .catch((err) => {
      console.error(err);
    });
}
