import { BPELNode } from "../../BPELNode.model";
import { CatchAllElement } from "./catchAll-element.model";

export class CatchAll extends BPELNode {
    element: CatchAllElement;

    constructor() {
        super();
        this.element = new CatchAllElement();
    }
}