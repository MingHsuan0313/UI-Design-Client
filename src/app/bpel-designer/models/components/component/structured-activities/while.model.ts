import VertexStorage from "src/app/models/vertex-storage.model";
import { WhileAttribute } from "../../attribute/structured-activities/while-attribute.model";
import { WhileElement } from "../../element/structured-activities/while-element.model";
import { BPELComponent } from "../BPELComponent.model";

export class While extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: WhileAttribute;
    element?: WhileElement;
    componentName: String = "while";

    constructor(id: String) {
        super(id);
        this.attribute = new WhileAttribute();
        this.element = new WhileElement();
        console.log(this.componentName);
    }
}