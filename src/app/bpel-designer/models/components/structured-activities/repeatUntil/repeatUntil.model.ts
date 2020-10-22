import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";
import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../BPELComponent.model";
import { RepeatUntilElement } from "./repeatUntil-element.model";

export class RepeatUntil extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    element?: RepeatUntilElement;
    componentName: string = "repeatUntil";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.element = new RepeatUntilElement();
        console.log(this.componentName);
    }
}