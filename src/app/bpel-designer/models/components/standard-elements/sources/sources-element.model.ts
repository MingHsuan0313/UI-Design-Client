import { Source } from "./source.model";

export class SourcesElement {
    sourceList: Source[];   // 1...*

    constructor() {
        this.sourceList = new Array<Source>();
        this.sourceList.push(new Source());
        console.log("[CONSTRUCT] construct a new <source> for the <sources>");
    }

    push(): void {
        this.sourceList.push(new Source());
    }

    pop(): void {
        this.sourceList.pop();
    }
}