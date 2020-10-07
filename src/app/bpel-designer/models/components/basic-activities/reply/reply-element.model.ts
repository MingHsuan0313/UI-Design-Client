import { BPELComponentElement } from "../../BPELComponent-element.model";
import { Correlations } from "../../others/correlations/correlations.model";
import { ToParts } from "../../others/toParts/toParts.model";

export class ReplyElement extends BPELComponentElement {
    correlations?: Correlations;
    toParts?: ToParts;

    constructor() {
        super();
        // eager creation
        this.correlations = new Correlations();
        this.toParts = new ToParts();
    }
}