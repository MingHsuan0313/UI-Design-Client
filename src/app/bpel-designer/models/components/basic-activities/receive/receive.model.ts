import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../BPELComponent.model";
import { ReceiveAttribute } from "./receive-attribute.model";
import { ReceiveElement } from "./receive-element.model";

export class Receive extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ReceiveAttribute;
    element?: ReceiveElement;
    componentName: String = "receive";

    constructor(id: String) {
        super(id);
        this.attribute = new ReceiveAttribute();
        this.element = new ReceiveElement();
        console.log(this.componentName);
    }
}