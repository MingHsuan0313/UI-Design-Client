import { BPELNode } from "../../../BPELNode.model";
import { ExtensionAttribute } from "./extension-attribute.model";

export class Extension extends BPELNode {
    attribute: ExtensionAttribute;

	constructor() {
        super();
        this.attribute = new ExtensionAttribute();
	}
}