import { DomainError } from "./domainError"
import { Result } from "./Results"

export class Guard {
  public static againstNullOrUndefined(prop: any, propName: string): Result<any> {
    const domainError = new DomainError(propName, "againstNullOrUndefined")

    if (prop === null || prop === undefined) {
      return Result.fail(domainError)
    }

    return Result.ok(prop)
  }
}