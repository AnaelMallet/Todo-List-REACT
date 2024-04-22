import { graphqlProps } from "src/domains/users/infra/graphql/resolvers"

import { Result } from "./Results"

export interface BasicController {
  executeImplementation(props: graphqlProps): Promise<Result<any>>
}