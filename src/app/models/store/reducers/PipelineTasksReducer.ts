import { PipelineStorage, Operation, Task } from '../../wizard-task-dependency';
import { createReducer, Action } from 'typed-reducer';
import {
    PipelineActionTypes,
    PipelineCreateOperationAction,
    PipelineCreateTaskAction,
    PipelineDeleteTaskAction,
    PipelineDeleteTasksAction,
    PipelineReadOperationPoolAction, PipelineReadTasksAction
} from '../actions/pipelineTaskAction/pipelineTask.action';

const initialState: PipelineStorage = new PipelineStorage();

class PipelineTaskReducer {
    @Action
    public createTask(store: PipelineStorage, action: PipelineCreateTaskAction): PipelineStorage {
        console.log("create action [reducer]")
        store = { ...store };
        let indexkey = store.tasks.size;
        store.tasks = {...store.tasks ,[indexkey.toString()]:action.task};
        return store;
    }

    @Action
    public createOperation(store: PipelineStorage, action: PipelineCreateOperationAction): PipelineStorage {
        console.log("create operation [reducer]")
        store = { ...store };
        store.operationPool = [...store.operationPool, action.operation];
        return store;
    }

    @Action
    public readTasks(store: PipelineStorage, action: PipelineReadTasksAction): Map<string, Task> {
        return store.tasks;
    }

    @Action
    public readOperationPool(store: PipelineStorage, action: PipelineReadOperationPoolAction): Operation[] {
        return store.operationPool;

    }

    @Action
    public deleteTasks(store: PipelineStorage, action: PipelineDeleteTasksAction): PipelineStorage {
        return store.removeAllTasks();
    }
}

export const reducer = createReducer(PipelineTaskReducer);