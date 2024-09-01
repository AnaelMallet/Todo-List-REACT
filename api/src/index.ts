import express from "express"
import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv"

import { createDataSource } from "./ormconfig"
import { getGraphqlAPI } from "./getFiles"

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

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })
}

main().catch(err => {
  console.error(err)
})