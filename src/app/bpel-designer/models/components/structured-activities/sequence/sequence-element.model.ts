import { BPELComponent } from "../../BPELComponent.model";
import { BPELComponentElementWithActivityList } from "../../BPELComponentElementWithActivityList.model";

export class SequenceElement extends BPELComponentElementWithActivityList {
    // activityList: BPELComponent[];

    constructor() {
        super();
        this.activityList = new Array<BPELComponent>();
    }

    push(): void {
        throw new Error("activities should be drawn and wrapped in <sqeuence>.");
    }

    pop(): void {
        throw new Error("activities should be drawn and wrapped out from <sequence>.");
    }
}