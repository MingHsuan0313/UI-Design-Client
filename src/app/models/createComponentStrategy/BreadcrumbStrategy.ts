import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";


export class BreadcrumbStrategy implements ICreateComponentStrategy {
    strategyName: string;
    createComponent(graphStorage: GraphStorage, component: any, parent: any) {
        throw new Error("Method not implemented.");
    }
}