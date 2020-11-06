import { Operation } from "./operation.model";
import { Task } from "./task.model";

export class PipelineStorage {
    tasks: Map<string,Task>;
    operationPool: Operation[];
    
    addTask(task:Task) {
        let indexkey = this.tasks.size;
        this.tasks.set(indexkey.toString(),task);
        return this;
    }
    
    addOperation(operation:Operation) {
        this.operationPool.push(operation);
        return this;
    }
    
    readTasks() {
        return this.tasks;
    }
    
    readOperationPool() {
        return this.operationPool;
    }
    
    removeAllTasks() {
       this.tasks.clear() 
       return this;
    }
}