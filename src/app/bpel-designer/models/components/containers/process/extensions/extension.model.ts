import { ExtensionAttribute } from "./extension-attribute.model";

export class Extension {
    attribute: ExtensionAttribute;

	constructor() {
        this.attribute = new ExtensionAttribute();
	}
}