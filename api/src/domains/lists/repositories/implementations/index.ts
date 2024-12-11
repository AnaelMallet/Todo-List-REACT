import { listRepository } from "../../infra/databases/repositories/implementations"

import { ListDomainRepository } from "./listDomainRepository"

const listDomainRepository = new ListDomainRepository(listRepository)

export {
  listDomainRepository
}