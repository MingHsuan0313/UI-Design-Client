import VertexStorage from "src/app/models/vertex-storage.model";
import { IfAttribute } from "./if-attribute.model";
import { IfElement } from "./if-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class If extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: IfAttribute;
    element?: IfElement;
    componentName: string = "if";

    constructor(id: string) {
        super(id);
        this.attribute = new IfAttribute();
        this.element = new IfElement();
        console.log(this.componentName);
    }
}