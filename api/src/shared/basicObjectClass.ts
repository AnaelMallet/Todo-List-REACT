import { v4 as uuid } from "uuid"

import { Result } from "./Results"

export abstract class Entity<T, P> {
  uuid: string
  props: P

  constructor(props: P, id?: string) {
    this.uuid = id ? id : uuid()
    this.props = props
  }

  static create (props: any, id?: string): Result<any> {
    return Result.ok()
  }
}

export abstract class ValueObject<T, P> {
  id?: number
  props: P

  constructor(props: P, id?: number) {
    this.id = id ? id : undefined
    this.props = props
  }

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