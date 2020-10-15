import { BPELNode } from "../../BPELNode.model";
import { TransitionConditionAttribute } from "./transitionCondition-attribute.model";
import { TransitionConditionElement } from "./transitionCondition-element.model";

export class TransitionCondition extends BPELNode {
    attribute: TransitionConditionAttribute;
    element: TransitionConditionElement;

    constructor() {
        super();
        this.attribute = new TransitionConditionAttribute();
        this.element = new TransitionConditionElement();
    }
}