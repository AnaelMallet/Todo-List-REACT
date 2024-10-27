import { EntityTarget, ObjectLiteral, Repository } from "typeorm"

import BasicRepository from "./basicRepository"

export default abstract class BasicDomainRepository<T extends ObjectLiteral> {
  repository: BasicRepository<T>

  constructor(repository: BasicRepository<T>) {
    this.repository = repository.getRepository()
}
}