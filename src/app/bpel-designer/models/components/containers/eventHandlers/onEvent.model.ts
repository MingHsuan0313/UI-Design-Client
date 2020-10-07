import { OnEventAttribute } from "./onEvent-attribute.model";
import { OnEventElement } from "./onEvent-element.model";

export class OnEvent {
    attribute: OnEventAttribute;
    element: OnEventElement;

    constructor() {
        this.attribute = new OnEventAttribute();
        this.element = new OnEventElement();
    }
}