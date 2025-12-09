import { AgainstNullOrUndefinedError } from "./basicErrors"
import { Result } from "./Results"

export class Guard {
  public static againstNullOrUndefined(prop: any, propName: string): Result<any> {
    if (prop === null || prop === undefined) {
      return Result.fail(new AgainstNullOrUndefinedError(propName))
    }

    return Result.ok(prop)
  }
}