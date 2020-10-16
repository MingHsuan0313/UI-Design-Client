import { BPELNode } from "../../BPELNode.model";
import { ConditionAttribute } from "./condition-attribute.model";
import { ConditionElement } from "./condition-element.model";

export class Condition extends BPELNode {
    attribute?: ConditionAttribute;
    element: ConditionElement;

    constructor() {
        super();
        this.attribute = new ConditionAttribute();
        this.element = new ConditionElement();
        console.log("construct a <condition> for given <if> or <elseif> or <while>");
    }
}