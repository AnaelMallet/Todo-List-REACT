import { DomainError } from "@shared/domainError"

export class UndoneTaskFoundError extends DomainError {
    constructor() {
        super("task", "Certaines tâches de cette liste ne sont pas terminé.")
    }
}