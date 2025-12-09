import { Entity } from "@shared/basicObjectClass"
import { Guard } from "@shared/guard"
import { Result } from "@shared/Results"

export type TaskProps =  {
    title: string
    description: string
    isDone?: boolean
    listId: string
}

export class Task extends Entity<Task, TaskProps> {
    get listId(): string {
        return this.props.listId
    }

    get title(): string {
        return this.props.title
    }

    get description(): string {
        return this.props.description
    }

    get isDone(): boolean {
        return this.props.isDone
    }

    static create(props: TaskProps, uuid?: string): Result<Task> {
        const guardResults = Result.combine([
            Guard.againstNullOrUndefined(props.title, "title"),
            Guard.againstNullOrUndefined(props.description, "description"),
            Guard.againstNullOrUndefined(props.listId, "listId")
        ])

        if (guardResults.isSuccess === false) {
            return Result.fail(guardResults.getErrors())
        }

        const task = new Task({ ...props }, uuid)

        return Result.ok(task)
    }

    updateTitle(title: string): void {
        this.props.title = title
    }

    updateDescription(description: string): void {
        this.props.description = description
    }

    toggleIsDone(): void {
        this.props.isDone = !this.props.isDone
    }
}