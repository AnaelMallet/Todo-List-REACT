import { DomainError } from "@shared/domainError"

export class UndoneTaskFoundError extends DomainError {
    constructor() {
        super("task", "You still have undone tasks.")
    }
}