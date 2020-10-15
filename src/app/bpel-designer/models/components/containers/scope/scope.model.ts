import VertexStorage from 'src/app/models/vertex-storage.model';
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

    constructor(id: string) {
        super(id);
        this.attribute = new ScopeAttribute();
        this.element = new ScopeElement();
        console.log(this.componentName)
    }
}