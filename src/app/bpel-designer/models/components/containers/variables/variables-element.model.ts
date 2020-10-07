import { Variable } from "./variable.model";

export class VariablesElement {
    variableList: Variable[];  // 1...*

    constructor() {
        this.variableList = new Array<Variable>();
        // fake data
        let mainStartRequestVariable = new Variable();
        this.add(mainStartRequestVariable);
        console.log("construct <variables> for new <process>");
    }

    add(variable: Variable): void {
        this.variableList.push(variable);
    }

    remove(variable: Variable): void {
        throw new Error("Method not implemented.");
    }

    getVariableList() {
        return this.variableList;
    }
}