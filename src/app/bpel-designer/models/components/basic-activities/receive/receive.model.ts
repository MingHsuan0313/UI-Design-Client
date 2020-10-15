import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../BPELComponent.model";
import { ReceiveAttribute } from "./receive-attribute.model";
import { ReceiveElement } from "./receive-element.model";

export class Receive extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: ReceiveAttribute;
    element?: ReceiveElement;
    componentName: string = "receive";

    constructor(id: string) {
        super(id);
        this.attribute = new ReceiveAttribute();
        this.element = new ReceiveElement();
        console.log(this.componentName);
    }
}