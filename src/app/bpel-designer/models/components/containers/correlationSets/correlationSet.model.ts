import { CorrelationSetAttribute } from "./correlationSet-attribute.model";

export class CorrelationSet {
    attribute: CorrelationSetAttribute;

    constructor() {
        this.attribute = new CorrelationSetAttribute();
    }
}