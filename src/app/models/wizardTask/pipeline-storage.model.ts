import { ServiceComponentModel } from "../service-component-dependency";
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