import { UIComponent } from "../modelDependency";
import VertexStorage from "../vertex-storage.model";

export class Breadcrumb implements UIComponent {
    x: String;
    y: String;
    width: number;
    height: number;
    id: String;
    selector: String;
    type: String;
    style?: Object[];
//    vertexStorage?: VertexStorage;
    isBasic?: boolean;
    items: any[];

    constructor(init?: Partial<Breadcrumb>) {
        Object.assign(this, init);
    }
    isBasicComponent(): boolean {
        throw new Error("Method not implemented.");
    }

    add(component: UIComponent): void {
    }

    getInfo(): any {
        return this;
    }

    remove(component: UIComponent): void {
    }

}