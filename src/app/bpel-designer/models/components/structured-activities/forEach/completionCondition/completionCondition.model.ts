import { CompletionConditionElement } from "./completionCondition-element.model";

export class CompletionCondition {
    element: CompletionConditionElement

    constructor() {
        this.element = new CompletionConditionElement();
    }
}