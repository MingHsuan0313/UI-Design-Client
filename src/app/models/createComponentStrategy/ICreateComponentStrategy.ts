import { GraphStorage } from "../graph-storage.model";
import { UIComponent } from "../modelDependency";

export interface ICreateComponentStrategy {
    strategyName: string;
    createComponent(graphStorage:GraphStorage,component,parent)
}