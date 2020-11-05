import { Operation } from "./operation.model";
import { Task } from "./task.model";

export class PipelineStorage {
    tasks: Map<string,Task>;
    operationPool: Operation[];
    
    addTask(task:Task) {
        let indexkey = this.tasks.size;
        this.tasks.set(indexkey.toString(),task);
    }
    
    addOperation(operation:Operation) {
        this.operationPool.push(operation);
    }
    
    removeAllTasks() {
       this.tasks.clear() 
    }
}