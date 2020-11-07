import { Operation } from "./operation.model";
import { Task } from "./task.model";

export class PipelineStorage {
    tasks: Map<string,Task>;
    operationPool: Operation[];
    
    constructor() {
        this.tasks = new Map();
        this.operationPool = [];
    }
    
    // addTask(task:Task) {
    //     let indexkey = this.tasks.size;
    //     this.tasks.set(indexkey.toString(),task);
    //     return this;
    // }
    
    // addOperation(operation:Operation) {
    //     console.log("add operation...")
    //     console.log(operation)
    //     this.operationPool.push(operation);
    //     console.log(this);
    //     console.log("wait a minuted")
    //     return this;
    // }
    
    // readTasks() {
    //     return this.tasks;
    // }
    
    // readOperationPool() {
    //     return this.operationPool;
    // }
    
    // removeAllTasks() {
    //    this.tasks.clear() 
    //    return this;
    // }
}