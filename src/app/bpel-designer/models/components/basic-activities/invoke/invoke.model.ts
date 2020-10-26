import { VertexStorage } from "src/app/models/graph-dependency";
import { InvokeAttribute } from "./invoke-attribute.model";
import { InvokeElement } from "./invoke-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";

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

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new InvokeAttribute();
        this.element = new InvokeElement();
        console.log(this.componentName);
    }
}