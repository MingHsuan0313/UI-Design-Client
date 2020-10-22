import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../BPELComponent.model'

export class Rethrow extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    componentName: string = "rethrow";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        console.log(this.componentName)
    }
}