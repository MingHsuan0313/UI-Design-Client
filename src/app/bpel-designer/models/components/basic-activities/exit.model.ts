import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import { VertexStorage } from "src/app/models/graph-dependency";;
import { BPELComponent } from '../BPELComponent.model'

export class Exit extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    componentName: string = "exit";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        console.log(this.componentName)
    }
}