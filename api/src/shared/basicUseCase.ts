import { Result } from "./Results"

export interface BasicUseCase {
  repository: any
  execute(props: any): Promise<Result<any>>
}