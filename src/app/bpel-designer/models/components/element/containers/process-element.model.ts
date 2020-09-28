import { BPELComponent } from "../../component/BPELComponent.model";
import { BPELComponentElement } from "../BPELComponent-element.model"
import { Variables } from "./variables/variables.model";

export class ProcessElement extends BPELComponentElement {
    variables?: Variables;
    componentList?: BPELComponent[];

    constructor() {
        super();
        this.variables = new Variables();
    }

    add(component: BPELComponent): void {
        this.componentList.push(component);
    }

    getVariables() {
        return this.variables;
    }
}