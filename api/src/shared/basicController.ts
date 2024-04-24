import { graphqlProps } from "src/domains/users/infra/graphql/resolvers"

import { Result } from "./Results"

export interface BasicController {
  useCase: any
  executeImplementation(props: graphqlProps): Promise<Result<any>>
}