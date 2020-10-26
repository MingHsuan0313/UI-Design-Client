import { FromPart } from "./fromPart.model";

export class FromPartsElement {
    fromPartList: FromPart[]; // 1...*

    constructor() {
        this.fromPartList = new Array<FromPart>();
        this.fromPartList.push(new FromPart());
        console.log("[CONSTRUCT] construct a new <fromPart> for the <fromParts>");
    }

    push(): void {
        this.fromPartList.push(new FromPart());
    }

    pop(): void {
        this.fromPartList.pop();
    }
}