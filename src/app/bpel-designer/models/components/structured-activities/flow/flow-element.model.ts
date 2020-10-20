import { BPELComponent } from "../../BPELComponent.model";
import { BPELComponentElementWithActivityList } from "../../BPELComponentElementWithActivityList.model";
import { Links } from "./links/links.model";

export class FlowElement extends BPELComponentElementWithActivityList {
    links: Links;
    // activityList: BPELComponent[];

    constructor() {
        super();
        this.links = new Links();
        this.activityList = new Array<BPELComponent>();
    }

    push(): void {
        throw new Error("activities should be drawn and wrapped in.");
    }

    pop(): void {
        throw new Error("activities should be drawn and wrapped out.");
    }
}