import { BPELComponent } from "../../../../component/BPELComponent.model";
import { BPELComponentElement } from "../../../BPELComponent-element.model";

export class ElseBranchElement implements BPELComponentElement {
    activity: BPELComponent;

    add(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }
    remove(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }

}