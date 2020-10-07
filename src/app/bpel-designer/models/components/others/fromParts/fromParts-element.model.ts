import { FromPart } from "./fromPart.model";

export class FromPartsElement {
    fromPartList: FromPart[]; // 1...*

    constructor() {
        this.fromPartList = new Array<FromPart>();
    }
}