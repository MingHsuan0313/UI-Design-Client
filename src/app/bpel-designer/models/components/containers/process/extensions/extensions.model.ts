import { BPELNode } from "../../../BPELNode.model";
import { ExtensionsElement } from "./extensions-element.model";

export class Extensions extends BPELNode {
    element: ExtensionsElement;

	constructor() {
        super();
        this.element = new ExtensionsElement();
	}
}