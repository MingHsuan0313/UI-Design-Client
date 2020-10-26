import { CorrelationSet } from "./correlationSet.model";

export class CorrelationSetsElement {
    correlationSetList: CorrelationSet[]; // 1...*

    constructor() {
        this.correlationSetList = new Array<CorrelationSet>();
        this.correlationSetList.push(new CorrelationSet());
        console.log("[CONSTRUCT] construct a new <correlationSet> for the <correlationSets>");
    }

    push(): void {
        this.correlationSetList.push(new CorrelationSet());
    }

    pop(): void {
        this.correlationSetList.pop();
    }
}