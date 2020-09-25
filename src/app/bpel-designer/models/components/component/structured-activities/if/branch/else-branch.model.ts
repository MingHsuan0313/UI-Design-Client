import VertexStorage from "src/app/models/vertex-storage.model";
import { ElseBranchElement } from "../../../../element/structured-activities/if/branch/else-branch-element.model";
import { BPELComponent } from "../../../BPELComponent.model";

export class ElseBranch extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    element?: ElseBranchElement;
    componentName: String = "else-branch";

    constructor(id: String) {
        super(id);
        this.element = new ElseBranchElement();
        console.log(this.componentName);
    }
}