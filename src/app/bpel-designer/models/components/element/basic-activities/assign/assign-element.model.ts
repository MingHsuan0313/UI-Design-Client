import { Copy } from "../../../component/basic-activities/assign/copy/copy.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class AssignElement implements BPELComponentElement {
    copyList: Copy[];

    add(component: Copy): void {
        this.copyList.push(component);
    }
    remove(component: Copy): void {
        throw new Error("Method not implemented.");
    }

}