import { BPELComponent } from "../../component/BPELComponent.model";
import { BPELComponentElement } from "../BPELComponent-element.model"

export class ProcessElement implements BPELComponentElement {
    variables?: any; //TODO:
    componentList?: BPELComponent[];

    add(component: BPELComponent): void {
        this.componentList.push(component);
    }
    remove(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }
}