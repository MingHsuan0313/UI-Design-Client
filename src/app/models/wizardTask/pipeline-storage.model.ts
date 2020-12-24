import { ServiceComponent } from "../store/serviceEntry.model";
import { Task } from "./task.model";

export class PipelineStorage {
    tasks: Map<string,Task>; //<index,task>
    // serviceComponentPool: ServiceComponent[]; //<serviceID,task>
    serviceComponentPool: Object; // <serviceID, task>
    
    constructor() {
        this.tasks = new Map();
        this.serviceComponentPool = {};
    }
}