import { Action } from '@ngrx/store';
import { PipelineStorage,Task } from '../../wizard-task-dependency';
import { Operation } from '../serviceEntry.model';

export enum PipelineActionTypes {
    CREATE_TASK_ACTION = "[Pipeline] Create Task",
    CREATE_OPERATION_ACTION = "[Pipeline] Create Operation",
    DELETE_TASKS_ACTION = "[Pipeline] Delete Tasks",
    DELETE_OPERATION_POOL_ACTION = "[Pipeline] Delete Operation Pool"

}

export class PipelineCreateTaskAction implements Action {
    public type = PipelineActionTypes['CREATE_TASK_ACTION'];
    constructor(public task: Task) {}
}

export class PipelineCreateOperationAction {
    public type = PipelineActionTypes['CREATE_OPERATION_ACTION'];
    constructor(public operation: Operation) {}
}

export class PipelineDeleteTaskAction {
    public type = PipelineActionTypes['DELETE_TASK_ACTION'];
    constructor(){}
}

export class PipelineDeleteTasksAction {
    public type = PipelineActionTypes['DELETE_TASKS_ACTION'];
    constructor(){}
}

export class PipelineDeleteOperationPoolAction {
    public type = PipelineActionTypes['DELETE_OPERATION_POOL_ACTION'];
    constructor(){}
}