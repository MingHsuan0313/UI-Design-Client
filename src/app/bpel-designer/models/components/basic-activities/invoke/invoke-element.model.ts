import { BPELComponentElement } from "../../BPELComponent-element.model";
import { Catch } from "../../others/catch/catch.model";
import { CatchAll } from "../../others/catchAll/catchAll.model";
import { CompensationHandler } from "../../others/compensationHandler/compensationHandler.model";
import { Correlations } from "../../others/correlations/correlations.model";
import { FromParts } from "../../others/fromParts/fromParts.model";
import { ToParts } from "../../others/toParts/toParts.model";

export class InvokeElement extends BPELComponentElement {
    correlations?: Correlations;
    catchList?: Catch[];
    catchAll?: CatchAll;
    compensationHandler?: CompensationHandler;
    fromParts?: FromParts;
    toParts?: ToParts;

    constructor() {
        super();
        // eager creation
        this.correlations = new Correlations();
        this.catchList = new Array<Catch>();
        this.catchAll = new CatchAll();
        this.compensationHandler = new CompensationHandler();
        this.fromParts = new FromParts();
        this.toParts = new ToParts();
    }
}