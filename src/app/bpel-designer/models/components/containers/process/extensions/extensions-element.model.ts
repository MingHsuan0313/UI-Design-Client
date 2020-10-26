import { Extension } from "./extension.model";

export class ExtensionsElement {
    extensionList: Extension[]; // 1...*

	constructor() {
        this.extensionList = new Array<Extension>();
        this.extensionList.push(new Extension());
        console.log("[CONSTRUCT] construct a new <extension> for the <extensions>");
    }
    
    push(): void {
        this.extensionList.push(new Extension());
    }

    pop(): void {
        this.extensionList.pop();
    }
}