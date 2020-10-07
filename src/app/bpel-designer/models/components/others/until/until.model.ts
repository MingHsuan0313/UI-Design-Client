import { UntilAttribute } from "./until-attribute.model";
import { UntilElement } from "./until-element.model";

export class Until {
    attribute: UntilAttribute;
    element: UntilElement;

    constructor() {
        this.attribute = new UntilAttribute();
        this.element = new UntilElement();
    }
}