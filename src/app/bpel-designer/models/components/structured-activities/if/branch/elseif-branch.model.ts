import VertexStorage from "src/app/models/vertex-storage.model";
import { ElseIfBranchElement } from "./elseif-branch-element.model";
import { BPELComponent } from "../../../BPELComponent.model";

export class ElseIfBranch extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    element?: ElseIfBranchElement;
    componentName: String = "elseif-branch";

    constructor(id: String) {
        super(id);
        this.element = new ElseIfBranchElement();
        console.log(this.componentName);
    }
}