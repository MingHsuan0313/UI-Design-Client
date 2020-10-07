import { FinalCounterValueAttribute } from "./finalCounterValue-attribute.model";
import { FinalCounterValueElement } from "./finalCounterValue-element.model";

export class FinalCounterValue {
    attribute: FinalCounterValueAttribute;
    element: FinalCounterValueElement;

    constructor() {
        this.attribute = new FinalCounterValueAttribute();
        this.element = new FinalCounterValueElement();
    }
}