import { Result } from "./Results"

export abstract class BasicTransformer<DomainType, EntityType> {
  abstract arrayToDomain(databaseEntities: EntityType[]): Result<DomainType[]>
  abstract toDomain(databaseEntity: EntityType): Result<DomainType>
  abstract toDatabase(domainEntity: DomainType): EntityType
}