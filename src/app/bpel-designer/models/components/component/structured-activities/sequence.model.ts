import VertexStorage from "src/app/models/vertex-storage.model";
import { SequenceAttribute } from "../../attribute/structured-activities/sequence-attribute.model";
import { SequenceElement } from "../../element/structured-activities/sequence-element.model";
import { BPELComponent } from "../BPELComponent.model";

export class Sequence extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: SequenceAttribute;
    element?: SequenceElement;
    componentName: String = "sequence";

    constructor(id: String) {
        super(id);
        this.attribute = new SequenceAttribute();
        this.element = new SequenceElement();
        console.log(this.componentName);
    }
}