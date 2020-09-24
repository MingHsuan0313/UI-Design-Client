import { From } from "../../../../component/basic-activities/assign/copy/from/from.model";
import { To } from "../../../../component/basic-activities/assign/copy/to.model";

// Not a BPELComponentAttribute because of lacking of standard elements
export class CopyElement {
    from: From;
    to: To;

    constructor(from: From, to: To) {
        this.from = from;
        this.to = to;
        console.log("consturct from-spec and to-spec pair for the <copy> element");
    }
}