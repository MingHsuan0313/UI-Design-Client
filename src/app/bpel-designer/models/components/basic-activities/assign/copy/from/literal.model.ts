import { LiteralElement } from "./literal-element.model";

export class Literal {
    element: LiteralElement;

    constructor(value: String) {
        this.element = new LiteralElement(value);
    }
}