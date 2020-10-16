import { BPELNode } from "../../../../BPELNode.model";
import { ToAttribute } from "./to-attribute.model";
import { ToElement } from "./to-element.model";

export class To extends BPELNode {
    attribute?: ToAttribute;
    element?: ToElement;

    constructor() {
        super();
        console.log("consturct a to-spec for the selected <copy>");
    }
}