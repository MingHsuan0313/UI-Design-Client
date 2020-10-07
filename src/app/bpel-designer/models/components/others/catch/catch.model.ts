import { CatchAttribute } from "./catch-attribute.model";
import { CatchElement } from "./catch-element.model";

export class Catch {
    attribute: CatchAttribute;
    element: CatchElement;

    constructor() {
        this.attribute = new CatchAttribute();
        this.element = new CatchElement();
    }
}