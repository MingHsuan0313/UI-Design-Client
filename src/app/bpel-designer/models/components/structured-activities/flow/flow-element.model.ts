import { BPELComponentElement } from "../../BPELComponent-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import { Links } from "./links/links.model";

export class FlowElement extends BPELComponentElement {
    links: Links;
    activityList: BPELComponent[];

    constructor() {
        super();
        this.links = new Links();
    }
}