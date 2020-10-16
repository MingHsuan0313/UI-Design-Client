import { BPELNode } from "../../../BPELNode.model";
import { ImportAttribute } from "./import-attribute.model";

export class Import extends BPELNode {
    attribute: ImportAttribute;

    constructor() {
        super();
        this.attribute = new ImportAttribute();
    }
}