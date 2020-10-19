import { Catch } from "../../others/catch/catch.model";
import { CatchAll } from "../../others/catchAll/catchAll.model";

export class FaultHandlersElement {
    catchList?: Catch[];
    catchAll?: CatchAll;

    constructor() {
        // eager creation
        this.catchList = new Array<Catch>();
        this.catchList.push(new Catch());
        console.log("[CONSTRUCT] construct a new <catch> for the <faultHandlers>");
        this.catchAll = new CatchAll();
    }

    push(): void {
        this.catchList.push(new Catch());
    }

    pop(): void {
        this.catchList.pop();
    }
}