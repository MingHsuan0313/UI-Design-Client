import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { CompensateScopeAttribute } from './compensateScope-attribute.model';

export class CompensateScope extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: CompensateScopeAttribute;
    componentName: String = "compensateScope";

    constructor(id: String) {
        super(id);
        this.attribute = new CompensateScopeAttribute();
        console.log(this.componentName)
    }
}