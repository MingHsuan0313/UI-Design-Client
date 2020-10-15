import VertexStorage from "src/app/models/vertex-storage.model";
import { ElseBranchElement } from "./else-branch-element.model";
import { BPELComponent } from "../../../BPELComponent.model";

export class ElseBranch extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    element?: ElseBranchElement;
    componentName: string = "else-branch";

    constructor(id: string) {
        super(id);
        this.element = new ElseBranchElement();
        console.log(this.componentName);
    }
}