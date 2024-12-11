import ListEntity from "../../entities/list"

import { ListRepository } from "./user"

const listRepository = new ListRepository(ListEntity)

export {
  listRepository
}