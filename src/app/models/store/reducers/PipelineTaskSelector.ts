import { PipelineStorage,Operation,Task } from '../../wizard-task-dependency';
import { createSelector } from '@ngrx/store';

export const pipelineStorage = (state: {pipelineStorage:PipelineStorage}) => {
    return state.pipelineStorage;
}
export const operationPoolSelector = () => createSelector(pipelineStorage,(pipelineStorage:PipelineStorage) => {
    return pipelineStorage.operationPool;
})

export const tasksSelector = () => createSelector(pipelineStorage,(pipelineStorage:PipelineStorage) => {
    return pipelineStorage.tasks;
})