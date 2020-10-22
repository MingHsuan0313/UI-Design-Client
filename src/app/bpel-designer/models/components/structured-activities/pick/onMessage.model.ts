import VertexStorage from "src/app/models/vertex-storage.model";
import { OnMessageAttribute } from "./onMessage-attribute.model";
import { OnMessageElement } from "./onMessage-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";

export class OnMessage extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: OnMessageAttribute;
    element?: OnMessageElement;
    componentName: string = "onMessage";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new OnMessageAttribute();
        this.element = new OnMessageElement();
        console.log(this.componentName);
    }
}