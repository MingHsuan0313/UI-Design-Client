import { BPELComponent } from "../../BPELComponent.model";
import { Correlations } from "../../others/correlations/correlations.model";
import { FromParts } from "../../others/fromParts/fromParts.model";

export class OnMessageElement {
    correlations?: Correlations;
    fromParts?: FromParts;
    activity: BPELComponent;

    constructor() {
        // eager creation
        this.correlations = new Correlations();
        this.fromParts = new FromParts();
        this.activity = null;
    }

    setActivity(activity: BPELComponent): void {
        this.activity = activity;
    }
}