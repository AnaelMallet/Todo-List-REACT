import { DomainError } from "./domainError"
import { Result } from "./Results"

export class Guard {
  public static againstNullOrUndefined(prop: any, propName: string): Result<any> {
    const domainError = new DomainError(propName, "againstNullOrUndefined")

    if (!prop) {
      return Result.fail(domainError)
    }

    return Result.ok(prop)
  }

  public static againstNotEquals(propA: any, propB: any, propName: string): Result<any> {
    const domainError = new DomainError(propName, `againstNotEquals`)

    if (propA !== propB) {
      return Result.fail(domainError)
    }

    return Result.ok()
  }
}