import { BPELComponentElement } from "../../BPELComponent-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import { Condition } from "../condition/condition.model";

export class RepeatUntilElement extends BPELComponentElement {
    activity: BPELComponent;
    condition: Condition;

    constructor() {
        super();
        // eager creation
        this.condition = new Condition();
    }
}