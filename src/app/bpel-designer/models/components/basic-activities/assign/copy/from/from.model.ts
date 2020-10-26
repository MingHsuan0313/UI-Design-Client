import { BPELNode } from "../../../../BPELNode.model";
import { FromAttribute } from "./from-attribute.model";
import { FromElement } from "./from-element.model";

export class From extends BPELNode {
    attribute?: FromAttribute;
    element?: FromElement;

    constructor() {
        super();
        console.log("consturct a from-spec for the selected <variables> or <copy>");
    }
}