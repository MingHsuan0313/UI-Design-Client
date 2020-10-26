import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import { VertexStorage } from "src/app/models/graph-dependency";;
import { BPELComponent } from '../../BPELComponent.model'
import { ThrowAttribute } from './throw-attribute.model';

export class Throw extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: ThrowAttribute;
    componentName: string = "throw";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new ThrowAttribute();
        console.log(this.componentName)
    }
}