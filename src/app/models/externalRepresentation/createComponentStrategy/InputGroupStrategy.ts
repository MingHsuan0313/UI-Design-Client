import { SelabEditor } from "../selab-editor.model";
import { ICreateComponentStrategy } from "./ICreateComponentStrategy";


export class InputGroupStrategy extends ICreateComponentStrategy {
    strategyName: string;
    createComponent(selabEditor: SelabEditor, component: any, parent: any) {
        throw new Error("Method not implemented.");
    }

    createDataBinding(part: String, index?){
        return null;
    }
}