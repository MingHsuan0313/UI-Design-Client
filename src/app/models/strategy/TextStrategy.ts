import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { UIComponent } from "../model";

export class TextStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Text Strategy";
    }

    createComponent(graphStorage:GraphStorage,component:UIComponent) {
        console.log("Hello start creating text")
    }
}