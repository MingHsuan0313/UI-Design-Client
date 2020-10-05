import VertexStorage from "src/app/models/vertex-storage.model";
import { IfAttribute } from "./if-attribute.model";
import { IfElement } from "./if-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class If extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: IfAttribute;
    element?: IfElement;
    componentName: String = "if";

    constructor(id: String) {
        super(id);
        this.attribute = new IfAttribute();
        this.element = new IfElement();
        console.log(this.componentName);
    }
}