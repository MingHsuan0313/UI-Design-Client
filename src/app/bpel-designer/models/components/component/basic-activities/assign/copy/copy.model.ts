import VertexStorage from "src/app/models/vertex-storage.model";
import { CopyAttribute } from "../../../../attribute/basic-activities/assign/copy/copy-attribute.model";
import { CopyElement } from "../../../../element/basic-activities/assign/copy/copy-element.model";
import { BPELComponent } from "../../../BPELComponent.model";
import { From } from "./from/from.model";
import { To } from "./to.model";

export class Copy extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: CopyAttribute; // Not a BPELComponentAttribute because of lacking of standard attributes
    element?: CopyElement; // Not a BPELComponentElement because of lacking of standard attributes
    componentName: String = "copy";

    constructor(id: String) {
        super(id);
        this.attribute = new CopyAttribute();
        this.element = new CopyElement(new From(), new To());
        console.log(this.componentName);
    }
}