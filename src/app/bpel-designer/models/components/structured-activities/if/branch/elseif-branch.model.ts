import VertexStorage from "src/app/models/vertex-storage.model";
import { ElseIfBranchElement } from "./elseif-branch-element.model";
import { BPELComponent } from "../../../BPELComponent.model";

export class ElseIfBranch extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    element?: ElseIfBranchElement;
    componentName: string = "elseif-branch";

    constructor(id: string) {
        super(id);
        this.element = new ElseIfBranchElement();
        console.log(this.componentName);
    }
}