import UpdateBPELDocService from 'src/app/bpel-designer/services/updateBPELDoc.service';
import { VertexStorage } from "src/app/models/graph-dependency";;
import { BPELComponent } from '../../BPELComponent.model'
import { ScopeAttribute } from './scope-attribute.model';
import { ScopeElement } from './scope-element.model';

export class Scope extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: ScopeAttribute;
    element?: ScopeElement;
    componentName: string = "scope";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new ScopeAttribute();
        this.element = new ScopeElement();
        console.log(this.componentName)
    }
}