import { DomainError } from "./domainError"

export class Result<T> {
  code: number
  isSuccess: boolean
  isFailure: boolean
  errors: DomainError[]
  value: T

  constructor(isSuccess: boolean, errors?: DomainError[], value?: T) {
    this.code = errors && errors.length > 0 ? 400 : 200
    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.errors = errors && errors.length > 0 ? [...errors as DomainError[]] : []
    this.value = value ? value as T : undefined

    Object.freeze(this)
  }

  public getValue(): T {
    if (this.isSuccess === false) {
      throw new Error("InvalidOperation: Can't retrieve value from a failed result.")
    }

    return this.value
  }

  public getErrors(): DomainError[] {
    return this.errors
  }

  public static ok<U> (value?: U): Result<U> {
    return new Result<U>(true, undefined, value)
  }

  public static fail<U> (errors: DomainError[] | DomainError): Result<U> {
    if (errors instanceof DomainError) {
      return new Result<U>(false, [errors], undefined)
    }

    return new Result<U>(false, errors)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result
      }
    }

    return Result.ok<any>()
  }

  public static test(result: Result<any>): Result<any> {
    if (result.isFailure) {
      return result
    }

    return Result.ok<any>()
  }
}