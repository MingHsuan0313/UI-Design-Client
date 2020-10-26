import { SequenceAttribute } from "./sequence-attribute.model";
import { SequenceElement } from "./sequence-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";

export class Sequence extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    attribute?: SequenceAttribute;
    element?: SequenceElement;
    componentName: string = "sequence";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new SequenceAttribute();
        this.element = new SequenceElement();
        console.log(this.componentName);
    }
}