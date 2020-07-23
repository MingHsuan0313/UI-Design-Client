import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";


export class InputTextStrategy implements ICreateComponentStrategy {
    strategyName: string;
    basex: number;
    basey: number;
    constructor(basex?, basey?) {
        // basic component
        if (basex == undefined || basey == undefined) {
            this.basex = 0;
            this.basey = 0;
        }
        // inside composite component
        else {
            this.basex = basex;
            this.basey = basey;
        }
        this.strategyName = "Input Strategy";
    }

    createComponent(graphStorage: GraphStorage, component: any, parent: any) {
    }
}