import { DomainError } from "@shared/domainError"

export class AgainstNullOrUndefinedError extends DomainError {
    constructor(propName: string) {
        super(propName, "this value is null or undefined")
    }
}