import { BPELComponent } from "../../BPELComponent.model";
import { Process } from "../../containers/process/process.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class SequenceElement extends BPELComponentElement {
    activityList: BPELComponent[];

    constructor() {
        super();
        this.activityList = new Array<BPELComponent>();
        this.activityList.push(null);
    }

    add(component: BPELComponent): void {
        if (component instanceof Process) {
            console.log("A <process> activity cannot be added to a <sequence>'s element");
            return;
        }
        this.activityList.push(component);
    }
}