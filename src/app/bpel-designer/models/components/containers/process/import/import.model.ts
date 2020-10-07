import { ImportAttribute } from "./import-attribute.model";

export class Import {
    attribute: ImportAttribute;

    constructor() {
        this.attribute = new ImportAttribute();
    }
}