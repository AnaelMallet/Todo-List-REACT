import { graphqlProps } from "@shared/basicResolvers"

import { Result } from "./Results"

export interface BasicController {
  useCase: any
  executeImplementation(props: graphqlProps): Promise<Result<any>>
}