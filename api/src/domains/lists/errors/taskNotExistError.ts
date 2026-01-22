import { DomainError } from "@shared/domainError"

export class TaskNotExistError extends DomainError {
    constructor() {
        super("task", "this task don't exist")
    }
}