import { BPELComponentElementWithActivity } from "../../BPELComponentElementWithActivity.model";
import { Condition } from "../condition/condition.model";

export class RepeatUntilElement extends BPELComponentElementWithActivity {
    // activity: BPELComponent;
    condition: Condition;

    constructor() {
        super();
        // eager creation
        this.condition = new Condition();
    }
}