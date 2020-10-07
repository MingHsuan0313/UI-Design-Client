import { RepeatEveryAttribute } from "./repeatEvery-attribute.model";
import { RepeatEveryElement } from "./repeatEvery-element.model";

export class RepeatEvery {
    attribute: RepeatEveryAttribute;
    element: RepeatEveryElement;

    constructor() {
        this.attribute = new RepeatEveryAttribute();
        this.element = new RepeatEveryElement();
    }
}