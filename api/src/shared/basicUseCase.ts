import { Result } from "./Results"

export interface basicUseCase {
  execute(prop?: any): Promise<Result<any>>
}