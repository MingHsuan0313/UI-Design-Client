import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { UIComponent } from "../model";

export class ButtonStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Button Strategy";
    }

    createComponent(graphStorage:GraphStorage,component:UIComponent) {

    }
}