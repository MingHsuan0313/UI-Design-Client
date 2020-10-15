import { Source } from "./source.model";

export class SourcesElement {
    sourceList: Source[];   // 1...*

    constructor() {
        this.sourceList = new Array<Source>();
        this.sourceList.push(new Source());
    }

    // TODO: same id's stacked modals will cause a big disaster
    // add() {
    //     this.sourceList.push(new Source());
    // }

    // remove() {
    //     this.sourceList.pop();
    // }
}