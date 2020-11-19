import { Operation } from "./operation.model";
import { Task } from "./task.model";

export class PipelineStorage {
    tasks: Map<string,Task>; //<index,task>
    operationPool: Map<string,Task>; //<serviceID,task>
    
    constructor() {
        this.tasks = new Map();
        this.operationPool = new Map();
    }
}