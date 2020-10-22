import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { ForEachAttribute } from './forEach-attribute.model';
import { ForEachElement } from './forEach-element.model';

export class ForEach extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: ForEachAttribute;
    element?: ForEachElement;
    componentName: string = "forEach";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new ForEachAttribute();
        this.element = new ForEachElement();
        console.log(this.componentName)
    }
}