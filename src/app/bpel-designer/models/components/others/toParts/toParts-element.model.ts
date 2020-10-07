import { ToPart } from "./toPart.model";

export class ToPartsElement {
    fromPartList: ToPart[]; // 1...*

    constructor() {
        this.fromPartList = new Array<ToPart>();
    }
}