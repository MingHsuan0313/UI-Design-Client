import { From } from "../../basic-activities/assign/copy/from/from.model";

export class VariableElement {
    from?: From;

    constructor() {
        // eager creation
        this.from = new From();
    }
}