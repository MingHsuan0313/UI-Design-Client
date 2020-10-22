import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";
import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../BPELComponent.model";
import { FlowElement } from "./flow-element.model";

export class Flow extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    element?: FlowElement;
    componentName: string = "flow";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.element = new FlowElement();
        console.log(this.componentName);
    }
}