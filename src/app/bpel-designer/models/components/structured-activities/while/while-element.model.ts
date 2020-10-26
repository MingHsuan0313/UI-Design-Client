import { BPELComponentElementWithActivity } from "../../BPELComponentElementWithActivity.model";
import { Condition } from "../condition/condition.model";

export class WhileElement extends BPELComponentElementWithActivity {
    // condition, activity are in the order
    condition: Condition;
    // activity: BPELComponent;

    constructor() {
        super();
        this.condition = new Condition();
    }
}