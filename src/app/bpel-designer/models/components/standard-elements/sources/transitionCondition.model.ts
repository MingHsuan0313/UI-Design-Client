import { TransitionConditionAttribute } from "./transitionCondition-attribute.model";
import { TransitionConditionElement } from "./transitionCondition-element.model";

export class TransitionCondition {
    attribute: TransitionConditionAttribute;
    element: TransitionConditionElement;

    constructor() {
        this.attribute = new TransitionConditionAttribute();
        this.element = new TransitionConditionElement();
    }
}