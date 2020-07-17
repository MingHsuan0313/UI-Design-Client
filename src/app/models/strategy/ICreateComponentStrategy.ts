import { GraphStorage } from "../graph-storage.model";
import { UIComponent } from "../model";

export interface ICreateComponentStrategy {
    strategyName: string;
    createComponent(graphStorage:GraphStorage,component:UIComponent)
}