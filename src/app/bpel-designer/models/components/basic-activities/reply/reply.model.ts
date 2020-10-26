import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";
import { BPELComponent } from "../../BPELComponent.model";
import { ReplyAttribute } from "./reply-attribute.model";
import { ReplyElement } from "./reply-element.model";

export class Reply extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    attribute?: ReplyAttribute;
    element?: ReplyElement;
    componentName: string = "reply";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new ReplyAttribute();
        this.element = new ReplyElement();
        console.log(this.componentName);
    }
}