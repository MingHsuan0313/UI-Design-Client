import { Correlation } from "./correlation.model";

export class CorrelationsElement {
    correlationList: Correlation[]; // 1...*

    constructor() {
        this.correlationList = new Array<Correlation>();
        this.correlationList.push(new Correlation());
        console.log("[CONSTRUCT] construct a new <correlation> for the <correlations>");
    }
}