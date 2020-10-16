import { ToPart } from "./toPart.model";

export class ToPartsElement {
    toPartList: ToPart[]; // 1...*

    constructor() {
        this.toPartList = new Array<ToPart>();
        this.toPartList.push(new ToPart());
        console.log("[CONSTRUCT] construct a new <toPart> for the toPartList");
    }
}