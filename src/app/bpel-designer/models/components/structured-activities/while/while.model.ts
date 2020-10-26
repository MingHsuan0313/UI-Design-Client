import { WhileAttribute } from "./while-attribute.model";
import { WhileElement } from "./while-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";

export class While extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    attribute?: WhileAttribute;
    element?: WhileElement;
    componentName: string = "while";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new WhileAttribute();
        this.element = new WhileElement();
        console.log(this.componentName);
    }
}