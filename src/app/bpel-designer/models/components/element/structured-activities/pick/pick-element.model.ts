import { BPELComponent } from "../../../component/BPELComponent.model";
import { OnMessage } from "../../../component/structured-activities/pick/onMessage.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class PickElement implements BPELComponentElement {
    onMessageList: OnMessage[];

    add(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }
    remove(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }

}