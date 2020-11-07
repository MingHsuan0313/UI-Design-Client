import { Action } from '@ngrx/store';
import { PipelineStorage,Task,Operation } from '../../../wizard-task-dependency';

export enum PipelineActionTypes {
    CREATE_TASK_ACTION = "[Pipeline] Create Task",
    CREATE_OPERATION_ACTION = "[Pipeline] Create Operation",
    READ_TASKS_ACTION = "[Pipeline] Read Tasks",
    READ_OPERATIONPOOL_ACTION =  "[Pipeline] Read Operations",
    DELETE_TASKS_ACTION = "[Pipeline] Delete Tasks"
}

export class PipelineCreateTaskAction implements Action {
    public type = PipelineActionTypes['CREATE_TASK_ACTION'];
    constructor(public task: Task) {}
}

export class PipelineCreateOperationAction {
    public type = PipelineActionTypes['CREATE_OPERATION_ACTION'];
    constructor(public operation: Operation) {}
}

export class PipelineReadTasksAction {
    public type = PipelineActionTypes['READ_TASKS_ACTION'];

}

export class PipelineReadOperationPoolAction {
    public type = PipelineActionTypes['READ_OPERATIONPOOL_ACTION'];
}

export class PipelineDeleteTaskAction {
    public type = PipelineActionTypes['DELETE_TASK_ACTION'];


}

export class PipelineDeleteTasksAction {
    public type = PipelineActionTypes['DELETE_TASKS_ACTION'];

}