import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { UIComponent } from "../model";

export class DropdownStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Dropdown Strategy";
    }

    createComponent(graphStorage:GraphStorage,component,parent) {

    }
}