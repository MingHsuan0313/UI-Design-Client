import { Copy } from "./copy/copy.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class AssignElement extends BPELComponentElement {
    copyList: Copy[];

    add(component: Copy): void {
        this.copyList.push(component);
    }
}