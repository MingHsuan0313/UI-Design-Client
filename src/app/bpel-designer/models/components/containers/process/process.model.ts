import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import { BPELComponent } from '../../BPELComponent.model'
import { ProcessAttribute } from './process-attribute.model';
import { ProcessElement } from './process-element.model';

export class Process extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    attribute?: ProcessAttribute;
    element?: ProcessElement;
    componentName: string = "process";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new ProcessAttribute();
        this.element = new ProcessElement();
        console.log(this.componentName)
    }
}