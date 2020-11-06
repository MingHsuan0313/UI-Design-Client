import { PipelineStorage,Operation,Task } from '../../wizard-task-dependency';
import { createReducer,Action } from 'typed-reducer';
import {PipelineActionTypes,
    PipelineCreateOperationAction,
    PipelineCreateTaskAction,
    PipelineDeleteTaskAction,
    PipelineDeleteTasksAction,
    PipelineReadOperationPoolAction,PipelineReadTasksAction} from '../actions/pipelineTaskAction/pipelineTask.action';
    
const initialState: PipelineStorage = new PipelineStorage();

export class PipelineTaskReducer {
    @Action
    public createTask(store: PipelineStorage,action: PipelineCreateTaskAction): PipelineStorage {
       return store.addTask(action.task);
    }
    
    @Action
    public createOperation(store: PipelineStorage,action: PipelineCreateOperationAction): PipelineStorage {
       return store.addOperation(action.operation);
    }
    
    @Action
    public readTasks(store: PipelineStorage,action: PipelineReadTasksAction): Map<string,Task> {
        return store.readTasks();
    }
    
    @Action
    public readOperationPool(store: PipelineStorage, action: PipelineReadOperationPoolAction): Operation[] {
       return store.readOperationPool(); 

    }
    
    @Action
    public deleteTasks(store:PipelineStorage, action: PipelineDeleteTasksAction): PipelineStorage {
        return store.removeAllTasks();
    }
}

