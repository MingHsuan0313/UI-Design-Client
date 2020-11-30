import { Operation } from "../store/serviceEntry.model";
import { Task } from "./task.model";

export class PipelineStorage {
    tasks: Map<string,Task>; //<index,task>
    operationPool: Map<string,Operation>; //<serviceID,task>
    
    constructor() {
        this.tasks = new Map();
        this.operationPool = new Map();
    }
}