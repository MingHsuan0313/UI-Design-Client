import VertexStorage from "src/app/models/vertex-storage.model";
import { InvokeAttribute } from "./invoke-attribute.model";
import { InvokeElement } from "./invoke-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class Invoke extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: InvokeAttribute;
    element?: InvokeElement;
    componentName: String = "invoke";

    constructor(id: String) {
        super(id);
        this.attribute = new InvokeAttribute();
        this.element = new InvokeElement();
        console.log(this.componentName);
    }
}