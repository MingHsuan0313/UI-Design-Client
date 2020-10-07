import { CorrelationSet } from "./correlationSet.model";

export class CorrelationSetsElement {
    correlationSetList: CorrelationSet[]; // 1...*

    constructor() {
        this.correlationSetList = new Array<CorrelationSet>();
    }
}