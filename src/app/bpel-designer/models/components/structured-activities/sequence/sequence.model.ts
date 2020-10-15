import VertexStorage from "src/app/models/vertex-storage.model";
import { SequenceAttribute } from "./sequence-attribute.model";
import { SequenceElement } from "./sequence-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class Sequence extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: SequenceAttribute;
    element?: SequenceElement;
    componentName: string = "sequence";

    constructor(id: string) {
        super(id);
        this.attribute = new SequenceAttribute();
        this.element = new SequenceElement();
        console.log(this.componentName);
    }
}