import { VariablesElement } from "./variables-element.model";

export class Variables {
    element: VariablesElement;

    constructor() {
        this.element = new VariablesElement();
    }

    getElement(): VariablesElement {
        return this.element;
    }
}