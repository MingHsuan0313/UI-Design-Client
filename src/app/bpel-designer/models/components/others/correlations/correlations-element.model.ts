import { Correlation } from "./correlation.model";

export class CorrelationsElement {
    correlationList: Correlation[]; // 1...*

    constructor() {
        this.correlationList = new Array<Correlation>();
    }
}