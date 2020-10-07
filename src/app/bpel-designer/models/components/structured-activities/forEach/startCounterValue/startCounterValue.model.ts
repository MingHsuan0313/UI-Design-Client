import { StartCounterValueAttribute } from "./startCounterValue-attribute.model"
import { StartCounterValueElement } from "./startCounterValue-element.model";

export class StartCounterValue {
    attribute: StartCounterValueAttribute;
    element: StartCounterValueElement;

    constructor() {
        this.attribute = new StartCounterValueAttribute();
        this.element = new StartCounterValueElement();
    }
}