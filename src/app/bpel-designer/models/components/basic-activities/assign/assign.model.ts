import VertexStorage from "src/app/models/vertex-storage.model";
import { AssignAttribute } from "./assign-attribute.model";
import { AssignElement } from "./assign-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class Assign extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: AssignAttribute;
    element?: AssignElement;
    componentName: String = "assign";

    constructor(id: String) {
        super(id);
        this.attribute = new AssignAttribute();
        this.element = new AssignElement();
        console.log(this.componentName);
    }
}