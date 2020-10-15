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

    constructor(id: string) {
        super(id);
        this.element = new RepeatUntilElement();
        console.log(this.componentName);
    }
}