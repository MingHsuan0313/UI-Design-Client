import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../BPELComponent.model";
import { ReplyAttribute } from "./reply-attribute.model";
import { ReplyElement } from "./reply-element.model";

export class Reply extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ReplyAttribute;
    element?: ReplyElement;
    componentName: String = "reply";

    constructor(id: String) {
        super(id);
        this.attribute = new ReplyAttribute();
        this.element = new ReplyElement();
        console.log(this.componentName);
    }
}