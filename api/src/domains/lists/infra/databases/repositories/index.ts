import { ListTestRepository } from "./listTestRepository"
import { TaskTestRepository } from "./taskTestRepository"

const listTestRepository = new ListTestRepository()
const taskTestRepository = new TaskTestRepository()

export {
  listTestRepository,
  taskTestRepository
}