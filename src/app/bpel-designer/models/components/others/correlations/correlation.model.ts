import { CorrelationAttribute } from "./correlation-attribute.model";

export class Correlation {
    attribute: CorrelationAttribute;

    constructor() {
        this.attribute = new CorrelationAttribute();
    }
}