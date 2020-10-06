import { BPELComponent } from "../../../BPELComponent.model";
import { Condition } from "../../condition/condition.model";
import { BPELComponentElement } from "../../../BPELComponent-element.model";

export class ElseIfBranchElement extends BPELComponentElement {
    condition: Condition;
    activity: BPELComponent;

    constructor() {
        super();
        this.condition = new Condition();
    }
}