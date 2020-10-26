import { BPELNode } from "../../BPELNode.model";
import { JoinConditionAttribute } from "./joinCondition-attribute.model";
import { JoinConditionElement } from "./joinCondition-element.model";

export class JoinCondition extends BPELNode {
    attribute: JoinConditionAttribute;
    element: JoinConditionElement;

    constructor() {
        super();
        this.attribute = new JoinConditionAttribute();
        this.element = new JoinConditionElement();
    }
}