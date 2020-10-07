import { BPELComponentElement } from "../../BPELComponent-element.model";
import { Correlations } from "../../others/correlations/correlations.model";
import { FromParts } from "../../others/fromParts/fromParts.model";

export class ReceiveElement extends BPELComponentElement {
    correlations?: Correlations;
    fromParts?: FromParts;

    constructor() {
        super();
        // eager creation
        this.correlations = new Correlations();
        this.fromParts = new FromParts();
    }
}