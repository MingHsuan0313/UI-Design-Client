import { QueryAttribute } from "./query-attribute.model";
import { QueryElement } from "./query-element.model";

export class Query {
    attribute: QueryAttribute;
    element: QueryElement;

    constructor() {
        this.attribute = new QueryAttribute();
        this.element = new QueryElement();
    }
}