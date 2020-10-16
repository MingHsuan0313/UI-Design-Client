import { BPELNode } from "../../../BPELNode.model";
import { CompletionConditionElement } from "./completionCondition-element.model";

export class CompletionCondition extends BPELNode {
    element: CompletionConditionElement

    constructor() {
        super();
        this.element = new CompletionConditionElement();
    }
}