import { BPELComponent } from "../../component/BPELComponent.model";
import { Condition } from "../../component/structured-activities/condition.model";
import { BPELComponentElement } from "../BPELComponent-element.model";

export class WhileElement implements BPELComponentElement {
    condition: Condition;
    activity: BPELComponent;

    constructor() {
        this.condition = new Condition();
    }

    add(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }
    remove(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }

}