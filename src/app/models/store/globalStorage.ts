import { TaskGraph, WizardTask } from "../wizardTask/TaskGraph.model";

export class SelabGlobalStorage {
    static projectName: string;
    static sumdl: {};
    static usedNameTable: {}; // save all existing page and theme name, for duplicate name checking
    static taskGraph: TaskGraph;

    static initializeTasks(task: WizardTask) {
        this.taskGraph = new TaskGraph(task);
    }

    static getTaskGraph() {
        return this.taskGraph;
    }

    static addName(name: string) {
        if (this.usedNameTable == undefined)
            this.usedNameTable = {}
        this.usedNameTable[name] = "success";
    }

    static deleteName(name: string) {
        delete this.usedNameTable[name];
    }

    static checkIsNameUsed(name: string) {
        if (this.usedNameTable == undefined)
            return false;

        if (name in this.usedNameTable)
            return true;
        else
            return false;
    }

    static setProjectName(projectName: string) {
        if (projectName.length == 0)
            this.projectName = "SelabProject";
        this.projectName = projectName;
        this.sumdl = {};
    }

    static getInfo() {
        return {
            "projectName": this.projectName,
            "sumdl": this.sumdl,
            "wizardGraph": this.taskGraph
        }
    }
}