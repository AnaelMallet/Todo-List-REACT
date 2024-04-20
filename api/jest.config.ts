import { Config } from "@jest/types"

const config : Config.InitialOptions = {
  collectCoverage: false,
  collectCoverageFrom: [
    "src/domains/**/*.ts"
  ],
  coverageProvider: "babel",
  coverageThreshold: {
    global: {
      branches: 100,
      statements: 100,
      lines: 100,
      functions: 100
    }
  },
  maxConcurrency: 5,
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: false,
  moduleDirectories: [
    "node_modules", 
    "api"
  ],
  moduleNameMapper: {
    "^@shared/(.*)": "<rootDir>/src/shared/$1"
  },
}

export default config