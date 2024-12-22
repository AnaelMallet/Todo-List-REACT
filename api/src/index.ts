import express from "express"
import { ApolloServer, AuthenticationError } from "apollo-server-express"
import dotenv from "dotenv"
import { defaultFieldResolver, GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils"
import jwt, { JwtPayload } from "jsonwebtoken"

import { createDataSource } from "./ormconfig"
import { getGraphqlAPI } from "./getFiles"
import { Result } from "@shared/Results"
import { DomainError } from "@shared/domainError"

const main = async () => {
  await createDataSource()

  const app = express()

  app.listen(3001, () => {
    console.log("server started on port 3001...")
  })
  app.get("/", (_, res) => {
    res.send("hello world !")
  })

  dotenv.config()

  const graphqlPromise = getGraphqlAPI()

  const { typeDefs, resolvers } = await Promise.resolve(graphqlPromise)
  
  function tokenIsValid(accessToken: string): boolean {
    let tokenIsValid = true

    jwt.verify(accessToken, process.env.JWT_KEY, (error) => {
      if (error) {
        tokenIsValid = false
      }
    })

    return tokenIsValid
  }

  function requireAuthDirective(
    directiveName: string,
    userTokenIsValid: (accessToken: string) => boolean
  ) {
    return {
      requireAuthDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
      requireAuthDirectiveTransformer: (schema: GraphQLSchema) => mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const requireAuth = getDirective(schema, fieldConfig, directiveName)

          if (requireAuth) {
            const { resolve = defaultFieldResolver } = fieldConfig

            fieldConfig.resolve = async function (source, args, context, info) {
              if (!context.user.authorizationToken || !context.user.authorizationToken.substr(7) || !userTokenIsValid(context.user.authorizationToken.substr(7))) {
                return Result.fail(new DomainError("authentication", "Your are not authorized to execute this request !"))
              }

              const token = context.user.authorizationToken.substr(7)
              const jwtData = jwt.verify(token, process.env.JWT_KEY) as JwtPayload

              context.user.userId = jwtData.userId

              return await resolve(source, args, context, info)
            }
          }

          return fieldConfig
        }
      })
    }
  }

  const { requireAuthDirectiveTypeDefs, requireAuthDirectiveTransformer } = requireAuthDirective("requireAuth", tokenIsValid)

  let schema = makeExecutableSchema({
    typeDefs: [
      typeDefs,
      requireAuthDirectiveTypeDefs
    ],
    resolvers
  })

  schema = requireAuthDirectiveTransformer(schema)

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        user: {
          authorizationToken: req.headers.authorization,
          userId: req.headers.userId
        }
      }
    }
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })
}

main().catch(err => {
  console.error(err)
})