import { PipelineStorage, Operation, Task } from '../../wizard-task-dependency';
import { createReducer, Action } from 'typed-reducer';
import {
    PipelineActionTypes,
    PipelineCreateOperationAction,
    PipelineCreateTaskAction,
    PipelineDeleteOperationPoolAction,
    PipelineDeleteTaskAction,
    PipelineDeleteTasksAction,
} from '../actions/pipelineTask.action';

class PipelineStorageReducer {
    @Action
    public createTask(store: PipelineStorage, action: PipelineCreateTaskAction): PipelineStorage {
        store = { ...store };
        let indexkey = Object.keys(store.tasks).length;
        store.tasks = {...store.tasks ,[indexkey.toString()]:action.task};
        return store;
    }

    @Action
    public createOperation(store: PipelineStorage, action: PipelineCreateOperationAction): PipelineStorage {
        console.log("create operation [reducer]")
        store = { ...store };
        store.serviceComponentPool = [...store.serviceComponentPool, action.operation];
        return store;
    }

    @Action
    public deleteTasks(store: PipelineStorage, action: PipelineDeleteTasksAction): PipelineStorage {
        store = {...store};
        store.tasks = new Map();
        return store;
    }

    @Action
    public deleteOperations(store: PipelineStorage, action: PipelineDeleteOperationPoolAction): PipelineStorage {
        store = {...store};
        store.serviceComponentPool = [];
        return store;
    }
}

export const pipelineStorageReducer = createReducer(PipelineStorageReducer);