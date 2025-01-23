import { Entity } from "@shared/basicObjectClass"
import { Guard } from "@shared/guard"
import { Result } from "@shared/Results"

export type ListProps = {
  name: string
  isFavorite: boolean
  userId: string
}

export class List extends Entity<List, ListProps> {
  get name(): string {
    return this.props.name
  }

  get isFavorite(): boolean {
    return this.props.isFavorite
  }

  get userId(): string {
    return this.props.userId
  }

  static create(props: ListProps, uuid?: string): Result<List> {
    const guardResults = Result.combine([
      Guard.againstNullOrUndefined(props.name, "name"),
      Guard.againstNullOrUndefined(props.isFavorite, "isFavorite"),
      Guard.againstNullOrUndefined(props.userId, "userId")
    ])

    if (guardResults.isSuccess === false) {
      return Result.fail(guardResults.getErrors())
    }

    const list = new List({ ...props }, uuid)

    return Result.ok(list)
  }

  toggleIsFavorite(): void {
    this.props.isFavorite = !this.props.isFavorite
  }

  updateName(name: string): void {
    this.props.name = name
  }
}