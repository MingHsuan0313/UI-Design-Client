import { BPELComponentElement } from "../../BPELComponent-element.model";
import { Scope } from "../../containers/scope/scope.model";
import { CompletionCondition } from "./completionCondition/completionCondition.model";
import { FinalCounterValue } from "./finalCounterValue/finalCounterValue.model";
import { StartCounterValue } from "./startCounterValue/startCounterValue.model";

export class ForEachElement extends BPELComponentElement {
    startCounterValue: StartCounterValue;
    finalCounterValue: FinalCounterValue;
    completionCondition?: CompletionCondition;
    scope: Scope;   //TODO:

    constructor() {
        super();
        this.startCounterValue = new StartCounterValue();
        this.finalCounterValue = new FinalCounterValue();
        // eager creation
        this.completionCondition = new CompletionCondition();
    }
}