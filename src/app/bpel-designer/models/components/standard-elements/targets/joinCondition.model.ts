import { JoinConditionAttribute } from "./joinCondition-attribute.model";
import { JoinConditionElement } from "./joinCondition-element.model";

export class JoinCondition {
    attribute: JoinConditionAttribute;
    element: JoinConditionElement;

    constructor() {
        this.attribute = new JoinConditionAttribute();
        this.element = new JoinConditionElement();
    }
}