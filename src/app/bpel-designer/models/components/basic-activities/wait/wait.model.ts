import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { WaitElement } from './wait-element.model';

export class Wait extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    element?: WaitElement;
    componentName: string = "wait";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.element = new WaitElement();
        console.log(this.componentName)
    }
}