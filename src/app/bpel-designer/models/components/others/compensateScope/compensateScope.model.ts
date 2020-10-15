import VertexStorage from 'src/app/models/vertex-storage.model';
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

    constructor(id: string) {
        super(id);
        this.attribute = new CompensateScopeAttribute();
        console.log(this.componentName)
    }
}