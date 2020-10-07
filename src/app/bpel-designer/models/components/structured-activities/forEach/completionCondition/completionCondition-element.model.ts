import { Branches } from "./branches.model";

export class CompletionConditionElement {
    branches?: Branches;

    constructor() {
        // eager creation
        this.branches = new Branches();
    }
}