import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import { VertexStorage } from "src/app/models/graph-dependency";;
import { BPELComponent } from '../../BPELComponent.model'
import { CompensateScopeAttribute } from './compensateScope-attribute.model';

export class CompensateScope extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: CompensateScopeAttribute;
    componentName: string = "compensateScope";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new CompensateScopeAttribute();
        console.log(this.componentName)
    }
}