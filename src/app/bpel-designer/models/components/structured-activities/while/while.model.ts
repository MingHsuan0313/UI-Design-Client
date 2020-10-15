import VertexStorage from "src/app/models/vertex-storage.model";
import { WhileAttribute } from "./while-attribute.model";
import { WhileElement } from "./while-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class While extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: WhileAttribute;
    element?: WhileElement;
    componentName: string = "while";

    constructor(id: string) {
        super(id);
        this.attribute = new WhileAttribute();
        this.element = new WhileElement();
        console.log(this.componentName);
    }
}