import { EntityTarget, ObjectLiteral, Repository } from "typeorm"

import { appDataSource } from "src/ormconfig"

export default abstract class BasicRepository<T extends ObjectLiteral> {
  repository: Repository<T>

  constructor(entity: EntityTarget<T>) {
    this.repository = appDataSource.getRepository(entity)
  }
}