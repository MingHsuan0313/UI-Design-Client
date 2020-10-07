import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../BPELComponent.model";
import { RepeatUntilElement } from "./repeatUntil-element.model";

export class RepeatUntil extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    element?: RepeatUntilElement;
    componentName: String = "repeatUntil";

    constructor(id: String) {
        super(id);
        this.element = new RepeatUntilElement();
        console.log(this.componentName);
    }
}