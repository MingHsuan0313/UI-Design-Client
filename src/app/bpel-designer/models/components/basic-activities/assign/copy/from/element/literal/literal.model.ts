import { LiteralElement } from "./literal-element.model";

export class Literal {
    element: LiteralElement;

    constructor() {
        // eager creation
        this.element = new LiteralElement();
    }
}