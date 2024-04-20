import { merge } from "lodash"

const fs = require("fs")

type GraphqlAPI = {
  typeDefs: any,
  resolvers: any
}

let basicResolvers = require("./shared/basicResolvers").default
let basicTypeDefs = require("./shared/basicTypeDefs").default

export const allDomains = fs.readdirSync("./src/domains")

export const getGraphqlAPI = async (): Promise<GraphqlAPI> => {
  for (const domain of allDomains) {
    const files = await fs.readdirSync(`./src/domains/${domain}/infra/graphql`)

    if (files.length === 0) {
      continue
    }

    const resolvers = require(`./domains/${domain}/infra/graphql/${files[0]}`).default
    const typeDefsFile = require(`./domains/${domain}/infra/graphql/${files[1]}`).default

    basicResolvers = merge(basicResolvers, resolvers)
    basicTypeDefs = [basicTypeDefs, typeDefsFile]
  }

  return {
    typeDefs: basicTypeDefs,
    resolvers: basicResolvers
  }
}

export const getORMEntities = async (): Promise<any[]> => {
  const entityFiles: any[] = []

  for (const domain of allDomains) {
    const domainEntityFiles = await fs.readdirSync(`./src/domains/${domain}/infra/databases/entities`)

    if (domainEntityFiles.length === 0) {
      continue
    }

    domainEntityFiles.map((file: string) => {
      const entityClass = require(`./domains/${domain}/infra/databases/entities/${file}`).default

      entityFiles.push(entityClass)
    })
  }

  return entityFiles
}