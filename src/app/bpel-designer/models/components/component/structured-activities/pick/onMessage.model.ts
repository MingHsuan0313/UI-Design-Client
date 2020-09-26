import VertexStorage from "src/app/models/vertex-storage.model";
import { OnMessageAttribute } from "../../../attribute/structured-activities/pick/onMessage-attribute.model";
import { OnMessageElement } from "../../../element/structured-activities/pick/onMessage-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class OnMessage extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: OnMessageAttribute;
    element?: OnMessageElement;
    componentName: String = "onMessage";

    constructor(id: String) {
        super(id);
        this.attribute = new OnMessageAttribute();
        this.element = new OnMessageElement();
        console.log(this.componentName);
    }
}