import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";
import { VertexStorage } from "src/app/models/graph-dependency";
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

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new ReceiveAttribute();
        this.element = new ReceiveElement();
        console.log(this.componentName);
    }
}