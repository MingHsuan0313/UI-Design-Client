import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../BPELComponent.model";
import { FlowElement } from "./flow-element.model";

export class Flow extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    element?: FlowElement;
    componentName: String = "flow";

    constructor(id: String) {
        super(id);
        this.element = new FlowElement();
        console.log(this.componentName);
    }
}