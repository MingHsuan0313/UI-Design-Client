import { SourceAttribute } from "./source-attribute.model";
import { SourceElement } from "./source-element.model";

export class Source {
    attribute: SourceAttribute;
    element: SourceElement;

    constructor() {
        this.attribute = new SourceAttribute();
        this.element = new SourceElement();
    }
}