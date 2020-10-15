import VertexStorage from "src/app/models/vertex-storage.model";
import { InvokeAttribute } from "./invoke-attribute.model";
import { InvokeElement } from "./invoke-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class Invoke extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: InvokeAttribute;
    element?: InvokeElement;
    componentName: string = "invoke";

    constructor(id: string) {
        super(id);
        this.attribute = new InvokeAttribute();
        this.element = new InvokeElement();
        console.log(this.componentName);
    }
}