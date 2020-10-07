import { Extension } from "./extension.model";

export class ExtensionsElement {
    extensionList: Extension[]; // 1...*

	constructor() {
        this.extensionList = new Array<Extension>();
	}
}