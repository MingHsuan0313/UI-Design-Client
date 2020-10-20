import { BPELComponent } from "../../../BPELComponent.model";
import { Condition } from "../../condition/condition.model";

export class ElseIfBranchElement {
    condition: Condition;
    activity: BPELComponent;

    constructor() {
        this.condition = new Condition();
        this.activity = null;
    }

    setActivity(activity: BPELComponent): void {
        this.activity = activity;
    }
}