import { Process } from "../../../component/containers/process.model";
import { Variable } from "./variable.model";

export class Variables {
    variableList?: Variable[];

    constructor() {
        this.variableList = [] as Variable[];
        let mainStartRequestVariable = new Variable("tns:start", "Main.startRequest.0");
        this.variableList.push(mainStartRequestVariable);
        console.log("construct <variables> for new <process>");
    }

    add(variable: Variable): void {
        this.variableList.push(variable);
    }

    remove(variable: Variable): void {
        throw new Error("Method not implemented.");
    }

    getInfo() {
        return this;
    }

    getVariableList() {
        return this.variableList;
    }
}