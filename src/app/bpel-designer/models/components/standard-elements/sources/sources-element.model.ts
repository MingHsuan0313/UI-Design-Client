import { Source } from "./source.model";

export class SourcesElement {
    sourceList: Source[];   // 1...*

    constructor() {
        this.sourceList = new Array<Source>();
    }
}