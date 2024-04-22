import { Result } from "./Results"

export abstract class BasicTransformer<DomainType, EntityType> {
  abstract toDomain(databaseEntity: EntityType): Promise<Result<DomainType>>
  abstract toDatabase(domainEntity: DomainType): Promise<EntityType>
}