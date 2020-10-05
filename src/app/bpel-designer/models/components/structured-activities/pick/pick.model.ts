import VertexStorage from "src/app/models/vertex-storage.model";
import { PickAttribute } from "./pick-attribute.model";
import { PickElement } from "./pick-element.model";
import { BPELComponent } from "../../BPELComponent.model";

export class Pick extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: PickAttribute;
    element?: PickElement;
    componentName: String = "pick";

    constructor(id: String) {
        super(id);
        this.attribute = new PickAttribute();
        this.element = new PickElement();
        console.log(this.componentName);
    }
}