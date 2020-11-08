import { PipelineStorage, Operation, Task } from '../../wizard-task-dependency';
import { createReducer, Action } from 'typed-reducer';
import {
    PipelineActionTypes,
    PipelineCreateOperationAction,
    PipelineCreateTaskAction,
    PipelineDeleteTaskAction,
    PipelineDeleteTasksAction,
} from '../actions/pipelineTaskAction/pipelineTask.action';

const initialState: PipelineStorage = new PipelineStorage();

class PipelineTaskReducer {
    @Action
    public createTask(store: PipelineStorage, action: PipelineCreateTaskAction): PipelineStorage {
        console.log("create action [reducer]")
        store = { ...store };
        let indexkey = Object.keys(store.tasks).length;
        console.log(store)
        console.log(indexkey)
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
    public deleteTasks(store: PipelineStorage, action: PipelineDeleteTasksAction): PipelineStorage {
        store = {...store};
        store.tasks = new Map();
        return store;
    }

    @Action
    public deleteOperations(store: PipelineStorage, action: PipelineDeleteTasksAction): PipelineStorage {
        store = {...store};
        store.operationPool = [];
        return store;
    }
}

export const reducer = createReducer(PipelineTaskReducer);