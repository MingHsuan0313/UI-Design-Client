import { Correlations } from "../../others/correlations/correlations.model";
import { FromParts } from "../../others/fromParts/fromParts.model";

export class OnEventElement {
    correlations?: Correlations;
    fromParts?: FromParts;
    scope: any; // TODO:

    constructor() {
        // eager creation
        this.correlations = new Correlations();
        this.fromParts = new FromParts();
    }
}