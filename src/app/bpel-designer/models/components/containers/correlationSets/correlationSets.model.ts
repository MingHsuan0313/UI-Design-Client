import { CorrelationSetsElement } from "./correlationSets-element.model";

export class CorrelationSets {
    element: CorrelationSetsElement;

    constructor() {
        this.element = new CorrelationSetsElement();
    }
}