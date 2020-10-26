import { BPELComponentElementWithActivity } from "../../BPELComponentElementWithActivity.model";
import { CompletionCondition } from "./completionCondition/completionCondition.model";
import { FinalCounterValue } from "./finalCounterValue/finalCounterValue.model";
import { StartCounterValue } from "./startCounterValue/startCounterValue.model";

export class ForEachElement extends BPELComponentElementWithActivity {
    startCounterValue: StartCounterValue;
    finalCounterValue: FinalCounterValue;
    completionCondition?: CompletionCondition;
    // scope: Scope = null;   //TODO:

    constructor() {
        super();
        this.startCounterValue = new StartCounterValue();
        this.finalCounterValue = new FinalCounterValue();
        // eager creation
        this.completionCondition = new CompletionCondition();
    }
}