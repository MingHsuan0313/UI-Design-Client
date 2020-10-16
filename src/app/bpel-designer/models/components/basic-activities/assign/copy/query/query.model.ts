import { BPELNode } from "../../../../BPELNode.model";
import { QueryAttribute } from "./query-attribute.model";
import { QueryElement } from "./query-element.model";

export class Query extends BPELNode {
    attribute: QueryAttribute;
    element: QueryElement;

    constructor() {
        super();
        this.attribute = new QueryAttribute();
        this.element = new QueryElement();
    }
}