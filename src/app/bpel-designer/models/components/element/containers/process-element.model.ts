import { BPELComponent } from "../../component/BPELComponent.model";
import { Process } from "../../component/containers/process.model";
import { BPELComponentElement } from "../BPELComponent-element.model"
import { Variables } from "./variables/variables.model";

export class ProcessElement implements BPELComponentElement {
    variables?: Variables;
    componentList?: BPELComponent[];

    constructor() {
        this.variables = new Variables();
    }

    add(component: BPELComponent): void {
        this.componentList.push(component);
    }
    remove(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }

    getVariables() {
        return this.variables;
    }
}