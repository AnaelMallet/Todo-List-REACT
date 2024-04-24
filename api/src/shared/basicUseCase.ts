import { Result } from "./Results"

export interface basicUseCase {
  repository: any
  execute(props: any): Promise<Result<any>>
}