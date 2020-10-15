import VertexStorage from "src/app/models/vertex-storage.model";
import { AssignAttribute } from "./assign-attribute.model";
import { AssignElement } from "./assign-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class Assign extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: AssignAttribute;
    element?: AssignElement;
    componentName: string = "assign";

    constructor(id: string) {
        super(id);
        this.attribute = new AssignAttribute();
        this.element = new AssignElement();
        console.log(this.componentName);
    }
}