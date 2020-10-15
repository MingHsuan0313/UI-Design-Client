import VertexStorage from "src/app/models/vertex-storage.model";
import { PickAttribute } from "./pick-attribute.model";
import { PickElement } from "./pick-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class Pick extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: PickAttribute;
    element?: PickElement;
    componentName: string = "pick";

    constructor(id: string) {
        super(id);
        this.attribute = new PickAttribute();
        this.element = new PickElement();
        console.log(this.componentName);
    }
}