import { ConditionAttribute } from "../../../../attribute/structured-activities/if/branch/condition-attribute.model";
import { ConditionElement } from "../../../../element/structured-activities/if/branch/condition-element.model";

export class Condition {
    attribute?: ConditionAttribute;
    element: ConditionElement;

    constructor() {
        this.attribute = new ConditionAttribute();
        this.element = new ConditionElement();
        console.log("construct a <condition> for given <if> or <elseif> branch");
    }
}