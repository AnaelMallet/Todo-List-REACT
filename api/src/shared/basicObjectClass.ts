import { v4 as uuid } from "uuid"

import { Result } from "./Results"

export class Entity<T, P> {
  uuid = uuid()
  props: P

  constructor(props: P) {
    this.props = props
  }

  static create (props: any): Result<any> {
    return Result.ok()
  }
}

export abstract class ValueObject<T, P> {
  id?: number
  props: P

  constructor(props: P) {}

  static create(props: any, id?: number): Result<any> {
    return Result.ok()
  }
}

export abstract class Value<T, P> {
  value: P

  constructor(value: P) {
    this.value = value
  }

  static create(value: any): Result<any> {
    return Result.ok()
  }
}