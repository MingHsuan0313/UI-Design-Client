import { PipelineStorage, Task } from '../../wizard-task-dependency';
import { createReducer, Action } from 'typed-reducer';
import {
    PipelineActionTypes,
    PipelineCreateOperationAction,
    PipelineCreateTaskAction,
    PipelineDeleteOperationPoolAction,
    PipelineDeleteTaskAction,
    PipelineDeleteTasksAction,
    PipelineSetOperationLogAction,
} from '../actions/pipelineTask.action';
import { Stream } from 'stream';

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
        store = { ...store };
        let serviceID = action.operation.serviceID;
        store.serviceComponentPool = {...store.serviceComponentPool, [serviceID]:action.operation};
        return store;
    }
    
    @Action
    // get log response from API Server
    public setOperationLog(store: PipelineStorage, action:PipelineSetOperationLogAction): PipelineStorage {
        store = {...store};
        let serviceID = action.serviceID;
        let log = action.log;
        store.serviceComponentPool = {...store.serviceComponentPool};
        store.serviceComponentPool[serviceID] = {...store.serviceComponentPool[serviceID],"log":log};
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