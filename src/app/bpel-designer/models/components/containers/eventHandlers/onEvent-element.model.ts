import { Correlations } from "../../others/correlations/correlations.model";
import { FromParts } from "../../others/fromParts/fromParts.model";
import { Scope } from "../scope/scope.model";

export class OnEventElement {
    correlations?: Correlations;
    fromParts?: FromParts;
    scope: Scope = null;   //TODO:

    constructor() {
        // eager creation
        this.correlations = new Correlations();
        this.fromParts = new FromParts();
    }
}