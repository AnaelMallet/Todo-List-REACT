import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  collectCoverage: false,
  collectCoverageFrom: [
    "src/domains/*/entities/*.ts",
    "src/domains/*/errors/*.ts",
    "src/domains/*/infra/databases/repositories/*.ts",
    "src/domains/*/use-cases/**/use-case.ts",
    "src/domains/*/value-objects/*.ts",
  ],
  coverageProvider: "babel",
  coverageThreshold: {
    global: {
      branches: 100,
      statements: 100,
      lines: 100,
      functions: 100,
    },
  },
  maxConcurrency: 5,
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: false,
  moduleDirectories: ["node_modules", "api"],
  moduleNameMapper: {
    "^@shared/(.*)": "<rootDir>/src/shared/$1",
  },
};

export default config;
