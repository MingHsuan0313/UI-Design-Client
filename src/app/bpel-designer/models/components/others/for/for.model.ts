import { ForAttribute } from "./for-attribute.model";
import { ForElement } from "./for-element.model";

export class For {
    attribute: ForAttribute;
    element: ForElement;

    constructor() {
        this.attribute = new ForAttribute();
        this.element = new ForElement();
    }
}