import { VertexStorage } from "src/app/models/graph-dependency";
import { CopyAttribute } from "./copy-attribute.model";
import { CopyElement } from "./copy-element.model";
import { BPELComponent } from "../../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";

export class Copy extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: CopyAttribute; // Not a BPELComponentAttribute because of lacking of standard attributes
    element?: CopyElement; // Not a BPELComponentElement because of lacking of standard attributes
    componentName: string = "copy";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new CopyAttribute();
        this.element = new CopyElement();
        console.log(this.componentName);
    }
}