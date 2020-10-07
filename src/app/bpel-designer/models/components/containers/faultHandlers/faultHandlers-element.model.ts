import { Catch } from "../../others/catch/catch.model";
import { CatchAll } from "../../others/catchAll/catchAll.model";

export class FaultHandlersElement {
    catchList?: Catch[];
    catchAll?: CatchAll;

    constructor() {
        // eager creation
        this.catchList = new Array<Catch>();
        this.catchAll = new CatchAll();
    }
}