import { Copy } from "./copy/copy.model";
import { BPELComponentElementWithActivityList } from "../../BPELComponentElementWithActivityList.model";

export class AssignElement extends BPELComponentElementWithActivityList {
    // copyList: Copy[];

    constructor() {
        super();
        this.activityList = new Array<Copy>();
    }

    push(): void {
        throw new Error("<copy> should be drawn and wrapped in.");
    }

    pop(): void {
        throw new Error("<copy> should be drawn and wrapped out.");
    }
}