import { Variable } from "./variable.model";

export class VariablesElement {
    variableList: Variable[];  // 1...*

    constructor() {
        this.variableList = new Array<Variable>();
        this.variableList.push(new Variable());
        console.log("[CONSTRUCT] construct a new <variabe> for the <variables>");
    }
}