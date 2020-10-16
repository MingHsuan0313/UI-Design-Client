import { BPELComponent } from "../../BPELComponent.model";
import { Condition } from "../condition/condition.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class WhileElement extends BPELComponentElement {
    // condition, activity are in the order
    condition: Condition;
    activity: BPELComponent = null;

    constructor() {
        super();
        this.condition = new Condition();
    }
}