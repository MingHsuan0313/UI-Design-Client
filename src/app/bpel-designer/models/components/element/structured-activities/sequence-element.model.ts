import { BPELComponent } from "../../component/BPELComponent.model";
import { Process } from "../../component/containers/process.model";
import { BPELComponentElement } from "../BPELComponent-element.model";

export class SequenceElement extends BPELComponentElement {
    activityList: BPELComponent[];

    add(component: BPELComponent): void {
        if (component instanceof Process) {
            console.log("A <process> activity cannot be added to a <sequence>'s element");
            return;
        }
        this.activityList.push(component);
    }
}